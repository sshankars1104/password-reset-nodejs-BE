const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const User = require("../models/user.js");
const generateToken = require("../utils/generateToken.js");
const verifyToken = require("../middleware/verifyToken.js");
const sendEmail = require("../utils/sendEmail.js");
const cors = require('cors');

// Use cors middleware to allow requests from your frontend
app.use(cors({
  origin: 'http://localhost:5173', //  frontend's URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

router.get("/test", (req, res) => {
  res.json({ message: "API Testing Successful" });
});

router.post("/user", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: "User created" });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/authenticate", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    return res.status(200).json({ 
      message: "Authentication successful",
      token 
    });
  } catch (error) {
    console.error("Error authenticating user:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Example protected route
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// Password Reset Request
router.post("/reset-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiration = Date.now() + 3600000;

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpiration;
    await user.save();

    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
    const message = `You requested a password reset. Click the link to reset your password: ${resetUrl}`;

    await sendEmail(user.email, "Password Reset Request", message);

    return res.status(200).json({ message: "Password reset token sent" });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Password Reset verification
router.post("/reset-password/:resetToken", async (req, res) => {
  const { resetToken } = req.params;
  const { password } = req.body;

  try {
    
    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Hash the new password and save it
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {

    return res.status(500).json({ message: "Server error", error: error.message });
  }
});


module.exports = router;

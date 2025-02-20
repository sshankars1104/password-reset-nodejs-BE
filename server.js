require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());

// Add CORS middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://password-reset-nodejs-fe.netlify.app', 'https://password-reset-nodejs-be.onrender.com'], //frontend domains
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

// Check if environment variables are loaded
if (!process.env.DB_CONNECTION_STRING) {
  console.error("DB_CONNECTION_STRING is not defined in the environment variables.");
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION_STRING)
  .then(() => {
    console.log('Database Connected');
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });

const database = mongoose.connection;
database.on('error', (err) => console.error('MongoDB error:', err));
database.on("connected", () => console.log('MongoDB connected'));

// Import and use routes
const userRoutes = require("./Router/userRoutes.js");
app.use("/api", userRoutes);

// Protected route
const verifyToken = require("./middleware/verifyToken");
app.get("/api/protected", verifyToken, (req, res) => {
  res.json({ message: "This is a protected route.", user: req.user });
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});

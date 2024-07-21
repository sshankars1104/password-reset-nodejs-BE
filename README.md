# Password Reset Using Nodejs (Back End only)

## Summary

1.User Registration: Users can register with their email and password.

02.User Authentication: Users can log in and receive a JWT token.

03.Password Reset Request: Users can request a password reset, which sends an email with a reset token.

04.Password Reset: Users can reset their password using the reset token.

# Testing in Local

# Here are the URLs for the API endpoints that you can test using Postman:

## API Testing(To test if the API is working correctly):

Deployed URL: https://password-reset-nodejs-be.onrender.com/api/test </br>
Local URL: http://localhost:3000/api/test </br>
Method: GET </br>
Description: Endpoint to test if the API is working correctly.</br>

## User Registration:

Deployed URL: https://password-reset-nodejs-be.onrender.com/api/user
URL: http://localhost:3000/api/user
Method: POST
Description: Endpoint to register a new user.
Request Body:
{
"email": "user@example.com",
"password": "userpassword"
}

## User Authentication:

Deployed URL: https://password-reset-nodejs-be.onrender.com/api/authenticate
URL: http://localhost:3000/api/authenticate
Method: POST
Description: Endpoint to authenticate a user and obtain a JWT token.
Request Body:

{
"email": "user@example.com",
"password": "userpassword"
}

## Password Reset Request:

Deployed URL: https://password-reset-nodejs-be.onrender.com/api/reset-password
URL: http://localhost:3000/api/reset-password
Method: POST
Description: Endpoint to request a password reset. Sends a reset token to the user's email.
Request Body:

{
"email": "user@example.com"
}

## Password Reset:

Deployed URL: http://password-reset-nodejs-be.onrender.com/api/reset-password/:resetToken
URL: http://localhost:3000/api/reset-password/:resetToken
Method: POST
Description: Endpoint to reset the user's password using the reset token.
Request Body:

{
"password": "newpassword"
}

## Render.com Link:(Deployed URL)

https://password-reset-nodejs-be.onrender.com

## Locial Url:

http://localhost:3000

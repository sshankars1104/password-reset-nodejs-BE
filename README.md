# Password Reset Using Nodejs (Back End only)

## Summary

01.User Registration:&nbsp &nbsp Users can register with their email and password.

02.User Authentication:&nbsp &nbsp Users can log in and receive a JWT token.

03.Password Reset Request:&nbsp &nbsp Users can request a password reset, which sends an email with a reset token.

04.Password Reset:&nbsp &nbsp Users can reset their password using the reset token.

# Testing in Local

# Here are the URLs for the API endpoints that you can test using Postman:

## API Testing(To test if the API is working correctly):

Deployed URL: https://password-reset-nodejs-be.onrender.com/api/test </br>
Local URL: http://localhost:3000/api/test </br>
Method: GET </br>
Description: Endpoint to test if the API is working correctly.</br>

## User Registration:

Deployed URL: https://password-reset-nodejs-be.onrender.com/api/user</br>
Local URL: http://localhost:3000/api/user</br>
Method: POST</br>
Description: Endpoint to register a new user.</br>
Request Body:</br>
{</br>
"email": "user@example.com",</br>
"password": "userpassword"</br>
}</br>

## User Authentication:

Deployed URL: https://password-reset-nodejs-be.onrender.com/api/authenticate</br>
Local URL: http://localhost:3000/api/authenticate</br>
Method: POST</br>
Description: Endpoint to authenticate a user and obtain a JWT token.</br>
Request Body:</br>

{</br>
"email": "user@example.com",</br>
"password": "userpassword"</br>
}</br>

## Password Reset Request:

Deployed URL: https://password-reset-nodejs-be.onrender.com/api/reset-password</br>
Local URL: http://localhost:3000/api/reset-password</br>
Method: POST</br>
Description: Endpoint to request a password reset. Sends a reset token to the user's email.</br>
Request Body:</br>

{</br>
"email": "user@example.com"</br>
}</br>

## Password Reset:

Deployed URL: http://password-reset-nodejs-be.onrender.com/api/reset-password/:resetToken</br>
Local URL: http://localhost:3000/api/reset-password/:resetToken</br>
Method: POST</br>
Description: Endpoint to reset the user's password using the reset token.</br>
Request Body:</br>

{</br>
"password": "newpassword"</br>
}</br>

## Render.com Link:(Deployed URL)

https://password-reset-nodejs-be.onrender.com</br>

## Locial Url:

http://localhost:3000</br>

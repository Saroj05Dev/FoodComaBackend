const express = require("express");
const { login, logout } = require("../controller/authController");

/* We have to initialize a router object to add routes in a new file.
Routers are used to segregate your routes in different modules **/

const authRouter = express.Router() 

authRouter.post('/login', login) // This is a route registration
authRouter.post('/logout', logout)

module.exports = authRouter; // Exporting this router 
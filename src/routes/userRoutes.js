const express = require("express");
const { createUser } = require("../controller/userController");

/* We have to initialize a router object to add routes in a new file.
Routers are used to segregate your routes in different modules **/

const userRouter = express.Router() 

userRouter.post('/', createUser) // This is a route registration

module.exports = userRouter; // Exporting this router 
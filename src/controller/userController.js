const UserRepository = require("../repository/userRepository")
const UserService = require("../service/userService")

async function createUser(req, res) {
    const userService = new UserService(new UserRepository);
    try {
        const response = await userService.registerUser(req.body)
    
        return res.status(201).json({
            message: "Successfully registered the user",
            success: true,
            data: response
        }) 
    } catch (error) {
        return res.status(error.statusCode).json({
            success: false,
            message: error.reason,
            data: {},
            error: error
        })
    }
}

module.exports = {
    createUser
}
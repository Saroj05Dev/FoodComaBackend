const { loginUser } = require("../service/authService");

async function login(req, res) {
    const loginPayload = req.body;

    try {
        const response = await loginUser(loginPayload);

        res.cookie("authToken", response, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            data: {},
            error: {}
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message,
            error: error
        });
    }
}

module.exports = {
    login
}
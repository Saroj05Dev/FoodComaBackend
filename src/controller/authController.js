const { loginUser } = require("../service/authService");

async function login(req, res) {
    const loginPayload = req.body;

    try {
        const response = await loginUser(loginPayload);

        res.cookie("authToken", response.token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            data: {
                userRole: response.userRole,
                userData: response.userData
            },
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

async function logout(req, res) {

    console.log("Cookies from frontend", req.cookies);

    res.cookie("authToken", null, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 0
        })

    return res.status(200).json({
        success: true,
        message: "Logout successful",
        error: {},
        data: {}
    })
}

module.exports = {
    login,
    logout
}
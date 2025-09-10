const { findUser, createUser } = require("../repository/userRepository");

    async function registerUser(userDetails) {
        // It will create a brand new user in DB

        // 1. We need to check if a user with the email & mobile number exists or not
        const user = await findUser({
            email: userDetails.email,
            mobileNumber: userDetails.mobileNumber,
        })

        if(user) {
            // We found a user
            throw { reason: "User with the given email and mobile number already exists", statusCode: 400 }
        }
        // 2. If not then create the user in the db 
        const newUser = await createUser({
            email: userDetails.email,
            password: userDetails.password,
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            mobileNumber: userDetails.mobileNumber
        })

        if(!newUser) {
            throw { reason: "Something went wrong can't create user", statusCode: 500 }
        }

        // 3. Return the details of created user
        return newUser;
    }

    module.exports = {
        registerUser
    }
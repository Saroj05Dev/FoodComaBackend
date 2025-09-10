const User = require("../schema/userSchema");

class UserRepository {


    async findUser(parameters) {
        try {
            const res = await User.findOne({ ...parameters })
            return res;
        } catch (error) {
            console.log(error)
        }
    }

    async createUser(userDetails) {
        try {
            const res = await User.create(userDetails);
            return res;
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = UserRepository;
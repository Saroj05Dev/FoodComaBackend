const User = require("../schema/userSchema");

async function findUser(parameters) {
  try {
    const res = await User.findOne({ ...parameters });
    return res;
  } catch (error) {
    console.log(error);
  }
}

async function createUser(userDetails) {
  try {
    const res = await User.create(userDetails);
    return res;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
    findUser,
    createUser
}

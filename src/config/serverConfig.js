const dotenv = require("dotenv");
dotenv.config();
// Here we're exporting all the env variables that project uses.
module.exports = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRY: process.env.JWT_EXPIRY
}
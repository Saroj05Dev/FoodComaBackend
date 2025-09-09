const dotenv = require("dotenv");
dotenv.config();
// Here we're exporting all the env variables that that project uses.
module.exports = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL
}
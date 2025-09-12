const AppError = require("./appError");

class InternalServer extends AppError {
    constructor () {
        super(`It's not you, it's our server where something went wrong`, 404)
    }
}

module.exports = InternalServer
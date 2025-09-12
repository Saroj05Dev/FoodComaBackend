const AppError = require("./appError");

class BadRequestError extends AppError {
    constructor (invalidParams) {
        // invalidParams: []
        let message = "";
        invalidParams.forEach(params => message += `${params}\n`);

        super(`The requesst has the following invalid parameters`, 404)
    }
}

module.exports = BadRequestError;
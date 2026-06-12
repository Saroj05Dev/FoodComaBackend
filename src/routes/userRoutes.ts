import express from "express";

import { createUser } from "../controller/userController";
import { validateRequest } from "../middlewares/validateRequest";
import { registerUserSchema } from "../validation/userValidation";

const userRouter = express.Router();

userRouter.post(
    "/",
    validateRequest(registerUserSchema), 
    createUser
);

export default userRouter;
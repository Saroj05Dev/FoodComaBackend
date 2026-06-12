import { Request, Response } from "express";

import * as UserService from "../service/userService";

import { RegisterUserDto } from "../types/user.types";

import { ApiError } from "../utils/ApiError";

export async function createUser(
    req: Request<{}, {}, RegisterUserDto>,
    res: Response
): Promise<Response> {
    try {
        const user = await UserService.registerUser(req.body);

        const userResponse = user.toObject();

        const { password, ...safeUser } = userResponse;

        return res.status(201).json({
            success: true,
            message: "Successfully registered user",
            data: safeUser,
            error: null,
        });
    } catch (error: any) {
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                data: null,
                error: null,
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error",
            data: null,
            error: null,
        });
    }
}
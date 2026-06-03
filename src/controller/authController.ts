import {
  Request,
  Response,
} from "express";

import {
  loginUser,
} from "../service/authService";

import {
  LoginUserDto,
} from "../types/user.types";

import { ApiError } from "../utils/ApiError";

export async function login(
  req: Request<{}, {}, LoginUserDto>,
  res: Response
): Promise<Response> {
  try {
    const response =
      await loginUser(req.body);

    res.cookie(
      "authToken",
      response.token,
      {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge:
          7 *
          24 *
          60 *
          60 *
          1000,
      }
    );

    return res.status(200).json({
      success: true,
      message:
        "Logged in successfully",
      data: {
        userRole:
          response.userRole,
        userData:
          response.userData,
      },
      error: null,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return res
        .status(error.statusCode)
        .json({
          success: false,
          message: error.message,
          data: null,
          error: null,
        });
    }

    return res.status(500).json({
      success: false,
      message:
        "Internal server error",
      data: null,
      error: null,
    });
  }
}

export async function logout(
  req: Request,
  res: Response
): Promise<Response> {
  console.log(
    "Cookies from frontend",
    req.cookies
  );

  res.cookie(
    "authToken",
    null,
    {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 0,
    }
  );

  return res.status(200).json({
    success: true,
    message: "Logout successful",
    error: null,
    data: null,
  });
}
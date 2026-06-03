import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  findUserWithPassword,
} from "../repository/userRepository";

import serverConfig from "../config/serverConfig";

import { ApiError } from "../utils/ApiError";

import { LoginUserDto } from "../types/user.types";

interface LoginResponse {
  token: string;
  userRole: string;
  userData: {
    email: string;
    firstName: string;
  };
}

export async function loginUser(
  authDetails: LoginUserDto
): Promise<LoginResponse> {
  const { email, password } = authDetails;

  const user = await findUserWithPassword({
    email,
  });

  if (!user) {
    throw new ApiError(
      "No user found with the given email",
      404
    );
  }

  const isPasswordValidated =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!isPasswordValidated) {
    throw new ApiError(
      "Invalid password, please try again",
      401
    );
  }

  const userRole =
    user.role || "USER";

  const token = jwt.sign(
    {
      email: user.email,
      id: user._id,
      role: userRole,
    },
    serverConfig.JWT_SECRET!,
    {
      expiresIn:
        serverConfig.JWT_EXPIRY as jwt.SignOptions["expiresIn"],
    }
  );

  return {
    token,

    userRole,

    userData: {
      email: user.email,
      firstName: user.firstName,
    },
  };
}
import {
  Request,
  Response,
  NextFunction,
} from "express";

import jwt from "jsonwebtoken";

import serverConfig from "../config/serverConfig";

import { AuthUser } from "../types/auth.types";

interface JwtPayload {
  id: string;
  email: string;
  role: "USER" | "ADMIN";
}

type AuthenticatedRequest = Request & {
  user?: AuthUser;
};

export async function isLoggedIn(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    const token = req.cookies?.authToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        data: null,
        error: "No auth token provided",
        message:
          "You must be logged in to access this resource",
      });
    }

    const decoded = jwt.verify(
      token,
      serverConfig.JWT_SECRET!
    ) as JwtPayload;

    req.user = {
      email: decoded.email,
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (error: any) {
    console.log(
      "Auth error:",
      error?.name
    );

    if (
      error?.name ===
      "TokenExpiredError"
    ) {
      res.clearCookie(
        "authToken",
        {
          httpOnly: true,
          sameSite: "lax",
          secure:
            process.env.NODE_ENV ===
            "production",
        }
      );

      return res.status(401).json({
        success: false,
        message:
          "Session expired. Please log in again.",
        error: null,
        data: null,
      });
    }

    return res.status(401).json({
      success: false,
      data: null,
      error:
        error?.message ??
        "Unauthorized",
      message:
        "Invalid authentication token",
    });
  }
}

export function isAdmin(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Response | void {
  const loggedInUser =
    req.user;

  if (
    !loggedInUser ||
    loggedInUser.role !== "ADMIN"
  ) {
    return res.status(403).json({
      success: false,
      data: null,
      message:
        "You're not authorized for this action",
      error: {
        statusCode: 403,
        reason:
          "Forbidden: Admins only",
      },
    });
  }

  next();
}
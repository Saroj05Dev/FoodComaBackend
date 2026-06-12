import { HydratedDocument } from "mongoose";
import { z } from "zod";
import { registerUserSchema } from "../validation/userValidation";

export type UserRole = "USER" | "ADMIN";

export interface IUser {
  firstName: string;
  lastName?: string;
  mobileNumber: string;
  email: string;
  password: string;
  role?: UserRole;
  address?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserDocument = HydratedDocument<IUser>;

export type RegisterUserDto = z.infer<typeof registerUserSchema>;

export interface LoginUserDto {
  email: string;
  password: string;
}
import { HydratedDocument } from "mongoose";

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

export interface RegisterUserDto {
  firstName: string;
  lastName?: string;
  mobileNumber: string;
  email: string;
  password: string;
}
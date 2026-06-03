import User from "../schema/userSchema";
import {
  IUser,
  RegisterUserDto,
  UserDocument,
} from "../types/user.types";

export async function findUser(
  filters: Partial<IUser>
): Promise<UserDocument | null> {
  return User.findOne(filters);
}

export async function createUser(
  userDetails: RegisterUserDto
): Promise<UserDocument> {
  return User.create(userDetails);
}

export async function findUserWithPassword(
  filters: Partial<IUser>
): Promise<UserDocument | null> {
  return User.findOne(filters).select("+password");
}
// import { createCartRepository } from "../repository/cartRepository";
import { createCartRepository } from "../repository/cartRepository";
import {
  createUser,
  findUser,
} from "../repository/userRepository";

import {
  RegisterUserDto,
  UserDocument,
} from "../types/user.types";

import { ApiError } from "../utils/ApiError";

export async function registerUser(
  userDetails: RegisterUserDto
): Promise<UserDocument> {
  const existingUser = await findUser({
    $or: [
      { email: userDetails.email },
      { mobileNumber: userDetails.mobileNumber },
    ],
  } as any);

  if (existingUser) {
    throw new ApiError(
      "User with given email or mobile number already exists",
      400
    );
  }

  const newUser = await createUser(userDetails);

  try {
    await createCartRepository(newUser._id.toString());
  } catch (error: any) {
    console.error("Failed to create cart during registration:", error);
    // Cart creation failed, but user was created
    // You might want to handle this differently based on your requirements
  }

  return newUser;
}
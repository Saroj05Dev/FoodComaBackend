import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IUser, UserDocument } from "../types/user.types";

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minlength: [3, "First name must be at least 3 characters"],
      maxlength: [15, "First name must be at most 15 characters"],
      lowercase: true,
      trim: true,
    },

    lastName: {
      type: String,
      minlength: [3, "Last name must be at least 3 characters"],
      maxlength: [15, "Last name must be at most 15 characters"],
      lowercase: true,
      trim: true,
    },

    mobileNumber: {
      type: String,
      trim: true,
      minlength: [10, "Mobile number should be 10 digits"],
      maxlength: [10, "Mobile number should be 10 digits"],
      unique: true,
      required: true,
    },

    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },

    password: {
      type: String,
      required: true,
      select: false,
      match: [
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*(\d|\W)).{8,}$/,
        "Password must contain uppercase, lowercase and number/special char",
      ],
    },

    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },

    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  const user = this as UserDocument;

  if (!user.isModified("password")) return;

  user.password = await bcrypt.hash(user.password, 10);
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
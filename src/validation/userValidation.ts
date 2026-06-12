import { z } from 'zod';

export const registerUserSchema = z.object({
    firstName: z
        .string()
        .min(3, "First name must be at least 3 characters long")
        .max(15, "First name must be at most 15 characters long"),

    lastName: z
        .string()
        .min(3, "Last name must be at least 3 characters long")
        .max(15, "Last name must be at most 15 characters long")
        .optional(),

    mobileNumber: z
        .string()
        .regex(/^\d{10}$/, "Mobile number must be exactly 10 digits"),

    email: z
        .string()
        .email("Invalid email address format"),

    password: z
        .string()
        .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*(\d|\W)).{8,}$/,
      "Password must contain uppercase, lowercase and number/special character"
    ),
});
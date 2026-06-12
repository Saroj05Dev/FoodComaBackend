import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export function validateRequest(schema: ZodSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: result.error.issues[0].message || "Invalid request data",
                data: null,
                error: null,
            });
        }
        req.body = result.data; // Use the parsed and validated data
        next();
    }
}
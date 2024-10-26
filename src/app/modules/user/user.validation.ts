import {z} from "zod";

export const userValidationSchema = z.object({
    email: z.string().email(),
    password: z.string().max(20).optional()
})


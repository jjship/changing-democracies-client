import * as z from "zod";

export const LoginValuesSchema = z.object({
  email: z.string().email({ message: "Must be a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Must be at least 6 characters long" })
    .max(100, { message: "Must be less than 100 characters long" }),
});

export type LoginValues = z.infer<typeof LoginValuesSchema>;

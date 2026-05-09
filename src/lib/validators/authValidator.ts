import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("invalid Email"),
    password: z.string().min(8, "password must be  at least 8 characters"),
});


export const signupSchema = z.object({
    name: z.string().min(3, "name must be at least 3 characters"),
    email: z.string().email("invalid Email"),
    password: z.string().min(8, "password must be  at least 8 characters"),
});




export const passwordResetSchema = z
    .object({
        newPassword: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Must contain at least one uppercase letter")
            .regex(/[a-z]/, "Must contain at least one lowercase letter")
            .regex(/[0-9]/, "Must contain at least one number")
            .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });


export const shippingSchema = z.object({
    name: z.string().min(3, "Enter your Full Name "),
    email: z.string().email("invalid Email"),
    address: z.string().min(3, "Enter your Address"),
    city: z.string().min(1, "Enter your City"),
    state: z.string().min(3, "Enter your State"),
    zipCode: z.string().min(3, "Enter your Zip Code"),
    country: z.string().min(3, "Please select your Country"),
});

export type ShippingFormData = z.infer<typeof shippingSchema>;
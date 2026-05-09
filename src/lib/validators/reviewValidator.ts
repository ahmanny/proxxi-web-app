import { z } from "zod";


export const reviewFormSchema = z.object({
    name: z.string().min(3, "Enter your full name"),
    email: z.string().email("invalid Email"),
    comment: z.string().min(5, "Write a comment"),
    rating: z.number().min(1, "Please select a rating"),
});

export type reviewFormData = z.infer<typeof reviewFormSchema>;
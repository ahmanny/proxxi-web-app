import { z } from "zod";

export const userProductFormSchema = z.object({
  quantity: z.number().min(1, "Quantity must be atleast 1"),
  color: z.string().min(1, "Please select a color"),
  size: z.string().min(1, "Please select a size"),
});
export type UserProductFormData = z.infer<typeof userProductFormSchema>;


export const addProductSchema = z.object({
  title: z.string().min(3, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  sku: z.string().min(1, "Slug is required"),
  categories: z
    .array(z.string().min(4, "Category must be a word"))
    .min(1, "Category is required"),
  highlights: z
    .array(z.string().min(4, "highlights must be a word"))
    .min(1, "you must select atleast one highlight"),
  gender: z.string().min(1, "please select a gender"),
  material: z.string().min(1, "please select a material"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().min(1, "Price must be greater than 0"),
  quantity_available: z.coerce
    .number()
    .min(1, "Available quantity is required"),
  stock_status: z.string().min(1, "Stock status is required"),
  colors: z.array(z.string()).min(1, "At least one color must be selected"),
  images: z.array(z.any()),
  newImages: z.array(z.any()).optional(),
  sizes: z.array(z.any()).min(1, "select a size"),
})
  .refine(
    (data) => data.images.length > 0 || (data.newImages?.length ?? 0) > 0,
    {
      message: "At least one image is required.",
      path: ["images"],
    }
  );
export type ProductFormData = z.infer<typeof addProductSchema>;
import { z } from "zod";
export const RecipeValidator = z.object({
  image: z.string().url().nonempty("Photo of recipe is required"),
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters" })
    .max(128, { message: "Title can't be longer than 128 characters" })
    .nonempty("Title is required"),
  ingredients: z.array(
    z.object({
      name: z
        .string()
        .min(3, { message: "Ingredient name must be at least 3 characters" })
        .max(60, {
          message: "Ingredient name can't be longer than 60 characters",
        })
        .nonempty(),
      amount: z.number().positive(),
      unit: z.string().nonempty(),
    })
  ),
  steps: z.array(
    z.object({
      content: z
        .string()
        .min(10, { message: "Step must be at least 10 characters" })
        .max(1200, {
          message: "Step can't be longer than 1200 characters",
        })
        .nonempty(),
    })
  ),
  prepTime: z.number().positive(),
  peoples: z.number().positive(),
  category: z.string().nonempty("Category is required"),
  subcategory: z.string().nonempty("Subcategory is required"),
});

export type RecipeRequest = z.infer<typeof RecipeValidator>;

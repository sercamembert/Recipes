import { z } from "zod";

const ingredientValidator = z.object({
  name: z.string().min(3).max(50),
});

const stepValidator = z.object({
  content: z.string().min(10).max(300),
});

const subcategoryValidator = z.object({
  name: z.string().min(3).max(50),
});

const categoryValidator = z.object({
  name: z.string().min(3).max(50),
});

export const RecipeValidator = z.object({
  image: z.string().url(),
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters" })
    .max(128, { message: "Title cant be longer than 128 characters" }),
  ingredients: z.array(ingredientValidator),
  steps: z.array(stepValidator),
  prepTime: z.number().positive(),
  peoples: z.number().positive(),
  category: categoryValidator,
  subcategory: subcategoryValidator.optional(), // subcategory is optional in RecipeValidator
});

export type RecipeRequest = z.infer<typeof RecipeValidator>;

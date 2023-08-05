import { z } from "zod";
export const FavouriteValidator = z.object({
  isFavourite: z.boolean(),
  recipeId: z.string(),
});

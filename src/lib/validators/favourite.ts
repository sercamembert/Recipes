import { z } from "zod";
export const FavouriteValidator = z.object({
  isFavourite: z.boolean(),
  recipeId: z.string(),
});

export const RemoveFavouritesValidator = z.object({
  checkedRecipes: z.array(
    z.object({
      recipeId: z.string(),
    })
  ),
});

export type RemoveFavouritesRequest = z.infer<typeof RemoveFavouritesValidator>;

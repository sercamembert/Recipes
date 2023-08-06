import { z } from "zod";
export const CommentValidator = z.object({
  text: z.string().max(1000),
  recipeId: z.string(),
});

export type CommentRequest = z.infer<typeof CommentValidator>;

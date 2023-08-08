import { z } from "zod";

export const DeleteCreatedValidator = z.object({
  id: z.string(),
});

export type DeleteCreatedRequest = z.infer<typeof DeleteCreatedValidator>;

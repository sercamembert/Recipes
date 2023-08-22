import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { DeleteCreatedValidator } from "@/lib/validators/created";
import { z } from "zod";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const { id } = DeleteCreatedValidator.parse(body);

    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Delete associated ingredients
    await db.ingredient.deleteMany({
      where: {
        recipeId: id,
      },
    });

    // Delete associated steps
    await db.step.deleteMany({
      where: {
        recipeId: id,
      },
    });

    // Delete associated favourites
    await db.favourite.deleteMany({
      where: {
        recipeId: id,
      },
    });

    await db.comment.deleteMany({
      where: {
        recipeId: id,
      },
    });

    // Delete the recipe
    await db.recipe.delete({
      where: {
        id: id,
        authorId: session.user.id,
      },
    });

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }
    return new Response(
      "Could not remove checked recipes, please try again later.",
      {
        status: 500,
      }
    );
  }
}

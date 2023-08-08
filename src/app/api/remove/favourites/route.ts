import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { RemoveFavouritesValidator } from "@/lib/validators/favourite";
import { z } from "zod";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const { checkedRecipes } = RemoveFavouritesValidator.parse(body);

    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const userId = session.user.id;
    await db.favourite.deleteMany({
      where: {
        userId: userId,
        recipeId: {
          in: checkedRecipes.map((item) => item.recipeId),
        },
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

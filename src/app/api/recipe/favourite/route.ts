import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { FavouriteValidator } from "@/lib/validators/favourite";
import { z } from "zod";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    let { isFavourite, recipeId } = FavouriteValidator.parse(body);

    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (isFavourite) {
      await db.favourite.deleteMany({
        where: {
          userId: session.user.id,
          recipeId,
        },
      });
      isFavourite = false;
    } else {
      await db.favourite.create({
        data: {
          userId: session.user.id,
          recipeId,
        },
      });
      isFavourite = true;
    }

    return new Response(JSON.stringify({ isFavourite }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response("Could not add recipe to favourites", { status: 500 });
  }
}

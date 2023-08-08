import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";
import { DeleteCreatedValidator } from "@/lib/validators/created";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const { id } = DeleteCreatedValidator.parse(body);

    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

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

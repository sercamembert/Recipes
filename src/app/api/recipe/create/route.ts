import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { RecipeValidator } from "@/lib/validators/recipe";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      category,
      image,
      ingredients,
      peoples,
      prepTime,
      steps,
      subcategory,
      title,
    } = RecipeValidator.parse(body);

    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const userRecipes = await db.recipe.findMany({
      where: {
        authorId: session.user.id,
      },
    });

    if (userRecipes.length >= 20) {
      return new Response("You cant create more than 20 recipes.", {
        status: 402,
      });
    }

    const recipe = await db.recipe.create({
      data: {
        image,
        title,
        category,
        subcategory,
        prepTime,
        peoples,
        authorId: session.user.id,
        steps: {
          createMany: {
            data: steps.map((step) => ({
              content: step.content,
            })),
          },
        },
        ingredients: {
          createMany: {
            data: ingredients.map((ingredient) => ({
              name: ingredient.name,
              amount: ingredient.amount,
              unit: ingredient.unit,
            })),
          },
        },
      },
      include: {
        steps: true,
        ingredients: true,
      },
    });

    return new Response(recipe.id, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }
    return new Response("Could not create recipe, please try again later", {
      status: 500,
    });
  }
}

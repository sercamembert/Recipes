import CreateComment from "@/components/CreateComment";
import Footer from "@/components/Footer";
import Ingredients from "@/components/Ingredients";
import RecipeComment from "@/components/RecipeComment";
import RecipeInfo from "@/components/RecipeInfo";
import SimilarRecipe from "@/components/SimilarRecipe";
import Steps from "@/components/Steps";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

interface PageProps {
  params: {
    id: string;
  };
}

const page = async ({ params }: PageProps) => {
  const session = await getAuthSession();
  const recipeId = params.id;

  const recipe = await db.recipe.findFirst({
    where: { id: recipeId },
    include: {
      author: true,
      comments: true,
      favourites: true,
      ingredients: true,
      steps: true,
    },
  });

  if (!recipe) {
    redirect("/404");
  }

  const comments = await db.comment.findMany({
    where: {
      recipeId: recipeId,
    },
    include: {
      author: true,
    },
  });

  const similarRecipes = await db.recipe.findMany({
    where: {
      category: recipe.category,
    },
    take: 4,
  });

  return (
    <div className="w-full mt-5 mb-44 flex flex-col">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-5">
        <Image
          src={recipe?.image}
          alt="recipe photo"
          width={1000}
          height={1000}
          className="max-h-[650px] rounded-md"
        />
        <RecipeInfo session={session} recipe={recipe} />

        <Ingredients ingredients={recipe.ingredients} />

        <Steps steps={recipe.steps} />
        <RecipeComment comments={comments} recipeId={recipeId} />
      </div>
      <h1 className="font-secoundary text-2xl mt-32 mb-4">Similar recipes</h1>
      <SimilarRecipe recipes={similarRecipes} />
    </div>
  );
};

export default page;

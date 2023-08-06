"use client";
import {
  Ingredient,
  Recipe,
  Step,
  User,
  Comment,
  Favourite,
} from "@prisma/client";

import { Session } from "next-auth";
import React, { useState } from "react";
import AddToFavourite from "./AddToFavourite";
import { formatTimeToNow } from "@/lib/utils";
import { Clock10, Users2 } from "lucide-react";

interface ExtendedRecipe extends Recipe {
  author: User;
  steps: Step[];
  ingredients: Ingredient[];
  comments: Comment[];
  favourites: Favourite[];
}

interface Props {
  session: Session | null;
  recipe: ExtendedRecipe;
}

const RecipeInfo = ({ session, recipe }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="font-secoundary text-2xl">{recipe.title}</h1>
      <p className="text-xl">Author: {recipe.author?.name}</p>
      <p className="text-sm">
        Posted {formatTimeToNow(new Date(recipe.createdAt))}
      </p>
      <div className="flex gap-4">
        <AddToFavourite userId={session?.user.id} recipe={recipe} />
        <p className="flex items-center gap-1 text-xl">
          <Clock10 width={25} height={25} /> {recipe.prepTime}min
        </p>
        <p className="flex items-center gap-1 text-xl">
          <Users2 width={25} height={25} /> {recipe.peoples}
        </p>
      </div>
    </div>
  );
};

export default RecipeInfo;

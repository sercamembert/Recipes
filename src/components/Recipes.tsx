import { Recipe } from "@prisma/client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { ArrowRight, Clock, Heart, Users2 } from "lucide-react";

interface Props {
  recipes: Recipe[];
}

const Recipes = ({ recipes }: Props) => {
  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 gap-x-6 grid-rows-2 md:grid-rows-1">
      {recipes.map((recipe, index) => (
        <Link key={index} href={`/recipe/${recipe.id}`}>
          <div className="flex flex-col bg-white border border-rose rounded-md">
            <Image
              src={recipe.image}
              alt="photo of similar recipe"
              width={800}
              height={600}
              quality={100}
              className=" rounded-t-md aspect-[.5/.4] hover:rounded-b-md hover:scale-105 ease-in-out duration-200 cursor-pointer"
            />
            <div className="flex flex-col p-2">
              <p className="font-semibold">{recipe.title}</p>
              <div className="flex gap-4">
                <div className="flex gap-1">
                  <Clock />
                  <p>{recipe.prepTime} min</p>
                </div>
                <div className="flex gap-1">
                  <Users2 color="#000000" />
                  <p>{recipe.peoples}</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Recipes;

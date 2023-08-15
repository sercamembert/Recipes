import { Recipe } from "@prisma/client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface Props {
  recipes: Recipe[];
}

const RecommendedRecipes = ({ recipes }: Props) => {
  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 gap-x-6 grid-rows-2 md:grid-rows-1 mb-40">
      {recipes.map((recipe, index) => (
        <Link key={index} href={`/recipe/${recipe.id}`}>
          <div className="flex flex-col bg-rose rounded-md">
            <Image
              src={recipe.image}
              alt="photo of similar recipe"
              width={800}
              height={600}
              quality={100}
              className=" rounded-t-md aspect-[.5/.4] hover:rounded-b-md hover:scale-105 ease-in-out duration-200 cursor-pointer"
            />
            <div className="flex justify-between p-2">
              <p className="">{recipe.title}</p>
              <ArrowRight />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RecommendedRecipes;

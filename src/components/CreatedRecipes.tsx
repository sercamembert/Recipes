"use client";
import { Recipe } from "@prisma/client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface Props {
  createdRecipes: Recipe[];
}

const CreatedRecipes = ({ createdRecipes }: Props) => {
  return (
    <div>
      <>
        <div className="w-full  grid grid-cols-2 md:grid-cols-4 gap-4 grid-rows-2 lg:grid-rows-1 mt-10">
          {createdRecipes.map((recipe, index) => (
            <div key={index} className="flex flex-col bg-rose rounded-md ">
              <Link href={`/recipe/${recipe.id}`}>
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
              </Link>
            </div>
          ))}
        </div>
      </>
    </div>
  );
};

export default CreatedRecipes;

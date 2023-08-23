import { Ingredient } from "@prisma/client";
import React from "react";
import { Checkbox } from "./ui/Checkbox";

interface Props {
  ingredients: Ingredient[];
}

const Ingredients = ({ ingredients }: Props) => {
  return (
    <div className="w-full lg:w-[80%] flex flex-col gap-4">
      <h1 className="text-2xl font-secoundary">Ingredints</h1>
      {ingredients.map((ingredient, index) => (
        <div
          key={index}
          className="w-full items-center flex  justify-between border-b border-dark px-2 mb-4 pb-1 gap-6"
        >
          <div className="flex gap-1 items-center w-[70%]">
            <Checkbox />
            <div className="whitespace-pre-line w-full break-words">
              {ingredient.name}
            </div>
          </div>
          <div className="w-[30%] flex items-start">
            <p>
              {ingredient.amount} {ingredient.unit}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Ingredients;

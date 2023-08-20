"use client";
import { Recipe } from "@prisma/client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Clock, Users2, ArrowLeft } from "lucide-react";

interface Props {
  recipes: Recipe[];
}

const Recipes = ({ recipes }: Props) => {
  const itemsPerPage = 40;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastRecipe = currentPage * itemsPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - itemsPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const totalPages = Math.ceil(recipes.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <h1 className="font-secoundary text-2xl lg:text-3xl font-medium">
        Recipes ({recipes.length})
      </h1>
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 gap-x-6 grid-rows-2 md:grid-rows-1">
        {currentRecipes.map((recipe, index) => (
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
      <div className="flex justify-center mt-4 mb-24">
        <button
          onClick={handlePrevPage}
          className="mx-1 px-3 py-1 rounded-md bg-white text-rose"
        >
          <ArrowLeft className="inline-block w-4 h-4" />
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-1 rounded-md ${
              currentPage === index + 1
                ? "bg-rose text-white"
                : "bg-white text-rose"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          className="mx-1 px-3 py-1 rounded-md bg-white text-rose"
        >
          <ArrowRight className="inline-block w-4 h-4" />
        </button>
      </div>
    </>
  );
};

export default Recipes;

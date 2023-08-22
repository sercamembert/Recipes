import Recipes from "@/components/Recipes";
import SearchFilters from "@/components/SearchFilters";
import { db } from "@/lib/db";
import React from "react";
import bannerImg from "@/img/banner/banner_head.png";
import Image from "next/image";
interface Props {
  params: {
    input: string;
    order: string;
    category: string;
  };
}

const page = async ({ params }: Props) => {
  const recipes = await db.recipe.findMany({
    where: {
      title: {
        contains: decodeURIComponent(params.input),
      },
      category: params.category !== "default" ? params.category : undefined,
    },
    orderBy: {
      createdAt: params.order === "newest" ? "desc" : undefined,
      prepTime: params.order === "shortest" ? "asc" : undefined,
    },
  });
  return (
    <div className="min-h-screen flex flex-col gap-10 mt-10">
      <div className="w-full flex flex-col items-center relative">
        <Image
          src={bannerImg}
          alt="header image"
          width={1000}
          height={1000}
          className="w-full"
          quality={100}
        />
        <h1
          className="text-lg sm:text-xl lg:text-3xl xl:text-4xl balance absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 uppercase"
          style={{
            zIndex: 1,
          }}
        >
          {decodeURIComponent(params.input)} <br />
          <p className="text-sm text-center lowercase font-semibold">
            {recipes.length} recipes
          </p>
        </h1>
      </div>
      <SearchFilters
        defaultOrder={params.order}
        input={params.input}
        defaultCategory={params.category}
      />
      {recipes.length <= 0 ? (
        <p className="text-center">
          Sorry, we didn`t find any recipes matching your search. Please try
          again.
        </p>
      ) : (
        <>
          <Recipes recipes={recipes} />
        </>
      )}
    </div>
  );
};

export default page;

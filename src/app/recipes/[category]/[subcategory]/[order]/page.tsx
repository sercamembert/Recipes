import Filters from "@/components/Filters";
import Recipes from "@/components/Recipes";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";
import bannerImg from "@/img/banner/banner_head.png";
import Image from "next/image";
interface PageProps {
  params: {
    category: string;
    subcategory: string;
    order: string;
  };
}

const page = async ({ params }: PageProps) => {
  let recipes;

  if (params.subcategory === "default") {
    recipes = await db.recipe.findMany({
      where: {
        category: params.category,
      },
      orderBy: {
        createdAt: params.order === "newest" ? "desc" : undefined,
        prepTime: params.order === "shortest" ? "asc" : undefined,
      },
    });
  } else {
    recipes = await db.recipe.findMany({
      where: {
        category: params.category,
        subcategory: decodeURIComponent(params.subcategory),
      },
      orderBy: {
        createdAt: params.order === "newest" ? "desc" : undefined,
        prepTime: params.order === "shortest" ? "asc" : undefined,
      },
    });
  }

  if (recipes.length <= 0) {
    redirect("/404");
  }

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
          {decodeURIComponent(params.category)}{" "}
          {params.subcategory !== "default" &&
            `/ ${decodeURIComponent(params.subcategory)}`}{" "}
          <br />
          <p className="text-sm text-center lowercase font-semibold">
            {recipes.length} recipes
          </p>
        </h1>
      </div>
      <Filters
        category={
          params.category.charAt(0).toUpperCase() + params.category.slice(1)
        }
        defaultSubcategory={decodeURIComponent(params.subcategory)}
        defaultOrder={params.order}
      />

      <Recipes recipes={recipes} />
    </div>
  );
};

export default page;

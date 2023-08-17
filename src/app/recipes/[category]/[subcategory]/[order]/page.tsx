import Filters from "@/components/Filters";
import Recipes from "@/components/Recipes";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";

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
    // Pobierz przepisy tylko na podstawie kategorii
    recipes = await db.recipe.findMany({
      where: {
        category: params.category,
      },
      orderBy: {
        createdAt: params.order === "newest" ? "desc" : undefined,
        prepTime: params.order === "shortest" ? "asc" : undefined,
        // Możesz dodać inne pola do sortowania, takie jak popularność
      },
    });
  } else {
    // Pobierz przepisy na podstawie kategorii i podkategorii
    recipes = await db.recipe.findMany({
      where: {
        category: params.category,
        subcategory: decodeURIComponent(params.subcategory),
      },
      orderBy: {
        createdAt: params.order === "newest" ? "desc" : undefined,
        prepTime: params.order === "shortest" ? "asc" : undefined,
        // Możesz dodać inne pola do sortowania, takie jak popularność
      },
    });
  }

  if (recipes.length <= 0) {
    redirect("/404");
  }

  return (
    <div className="min-h-screen flex flex-col gap-10 mt-10">
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

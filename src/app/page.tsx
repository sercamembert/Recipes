import HomeCategories from "@/components/HomeCategories";
import HomeRecipe from "@/components/HomeRecipe";
import PopularRecipes from "@/components/PopularRecipes";
import { db } from "@/lib/db";
import bbqImg from "@/img/categories/bbq.png";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import RecommendedRecipes from "@/components/RecommendedRecipes";
import Link from "next/link";

export default async function Home() {
  const homeRecipe = await db.recipe.findFirst({
    where: {
      id: "clkwssfxv002wvlk4tdkb4udf",
    },
  });

  const popularRecipes = await db.recipe.findMany({
    orderBy: {
      favourites: {
        _count: "desc",
      },
    },
    take: 4,
  });

  const recommendedRecipes = await db.recipe.findMany({
    orderBy: [
      {
        favourites: {
          _count: "desc",
        },
      },
      {
        createdAt: "desc",
      },
    ],
    take: 20,
  });

  return (
    <div className="w-full  mt-10">
      <HomeRecipe recipe={homeRecipe} />
      <h1 className="font-secoundary text-2xl lg:text-3xl  mt-10 lg:mt-32 mb-4 font-medium">
        Popular recipes
      </h1>
      <PopularRecipes recipes={popularRecipes} />
      <h1 className="font-secoundary text-2xl lg:text-3xl mt-10  mb-4 font-medium">
        Categories
      </h1>
      <HomeCategories />
      <div className="mt-10 m-auto flex flex-col md:flex-row  items-center justify-center gap-x-6 max-w-[450px] md:max-w-[100%]">
        <Image
          src={bbqImg}
          alt="new category barbeque"
          width={1000}
          height={1000}
          className="w-full md:w-1/3"
        />
        <div className="flex flex-col gap-2 p-4 mb-10 w-full md:max-w-[400px]">
          <h1 className="font-secoundary text-2xl lg:text-3xl font-medium">
            Barbeque Party
          </h1>
          <p className="text-xl font-medium">
            Surprise your friends with great barbeque recipes!
          </p>
          <Link href={"/recipes/Barbeque/default/auto"}>
            <Button variant={"bbq"} className="w-[100px] font-semibold">
              Check
            </Button>
          </Link>
        </div>
      </div>
      <RecommendedRecipes recipes={recommendedRecipes} />
    </div>
  );
}

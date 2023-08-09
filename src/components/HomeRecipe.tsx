"use client";
import { Recipe } from "@prisma/client";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  recipe: Recipe | null;
}

const HomeRecipe = ({ recipe }: Props) => {
  const router = useRouter();
  return (
    <div className="relative full flex flex-col lg:flex-row sm:max-h-[658px] md:max-h-[830px] lg:max-h-[410px] xl:max-h-[458px] sm:w-[70%] lg:w-[85%] xl:w-[75%] 2xl:w-[70%] m-auto">
      <Image
        width={1000}
        height={600}
        src={recipe?.image || ""}
        alt="home recipe image"
        onClick={() => router.push(`/recipe/${recipe?.id}`)}
        className="w-full hover:brightness-75 ease-in-out duration-200 cursor-pointer  max-h-[400px] sm:max-h-[380px] md:max-h-[515px] lg:max-h-[407px] xl:max-h-[485px] rounded-t-md lg:rounded-none lg:rounded-l-md"
      />
      <div className="bg-light p-10 flex flex-col justify-center gap-3 lg:w-[90%] xl:w-[70%] rounded-b-md lg:rounded-none lg:rounded-r-md">
        <h1 className="font-secoundary text-2xl font-semibold lg:text-4xl">
          {recipe?.title}
        </h1>
        <p className="lg:mr-16">
          Experience a culinary masterpiece with our Chicken & Chorizo
          Jambalaya. Let the enticing blend of flavors take you on a journey of
          pure comfort and irresistible taste!
        </p>
      </div>
      <Link href={`recipe/${recipe?.id}`}>
        <div className="rounded-[50%] p-2 bg-rose absolute bottom-2  right-2 hover:animate-pulse cursor-pointer">
          <ArrowRightIcon />
        </div>
      </Link>
    </div>
  );
};

export default HomeRecipe;

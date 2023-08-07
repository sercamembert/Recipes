import { authOptions, getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import React from "react";
import favouritesHeaderImg from "@/img/favourites/favourite-header.png";
import Image from "next/image";
import FavouriteRecipes from "@/components/FavouriteRecipes";
import { redirect } from "next/navigation";
import Footer from "@/components/Footer";

const page = async () => {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect(authOptions.pages?.signIn || "/sign-in");
  }
  const favouriteRecipes = await db.favourite.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      recipe: true,
    },
  });

  return (
    <>
      <div className="w-full relative mt-9 mb-16 min-h-screen">
        <div className="w-full flex flex-col items-center relative">
          <Image
            src={favouritesHeaderImg}
            alt="header image"
            width={1000}
            height={1000}
            className="w-full"
            quality={100}
          />
          <h1
            className="text-lg sm:text-xl lg:text-3xl xl:text-4xl font-secoundary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{
              zIndex: 1,
            }}
          >
            Favourites
          </h1>
        </div>
        {favouriteRecipes.length == 0 ? (
          <div className="flex justify-center items-center h-full mt-10">
            <h1 className="text-center text-xl ">
              Sorry, we cant find any favourite recipe...
            </h1>
          </div>
        ) : (
          <FavouriteRecipes favouriteRecipes={favouriteRecipes} />
        )}
      </div>
      <Footer />
    </>
  );
};

export default page;

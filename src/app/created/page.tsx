import { authOptions, getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import React from "react";
import favouritesHeaderImg from "@/img/favourites/favourite-header.png";
import Image from "next/image";
import { redirect } from "next/navigation";
import Footer from "@/components/Footer";
import CreatedRecipes from "@/components/CreatedRecipes";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";

const page = async () => {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect(authOptions.pages?.signIn || "/sign-in");
  }

  const createdRecipes = await db.recipe.findMany({
    where: {
      authorId: session.user.id,
    },
  });

  return (
    <>
      <div className="w-full  mt-9  mb-40">
        <div className="w-full flex flex-col items-center relative ">
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
            Created Recipes
            <p className="text-sm text-center lowercase font-semibold">
              {createdRecipes.length} recipes
            </p>
          </h1>
        </div>
        {createdRecipes.length == 0 ? (
          <div className="flex gap-2  justify-center items-center h-full mt-10">
            <h1 className="text-center text-xl ">
              Looking like you dont create any recipe yet...
            </h1>
            <Button
              variant={"default"}
              size={"xs"}
              className="text-sm rounded-md p-1"
            >
              <Plus />
            </Button>
          </div>
        ) : (
          <>
            <CreatedRecipes createdRecipes={createdRecipes} />
          </>
        )}
      </div>
    </>
  );
};

export default page;

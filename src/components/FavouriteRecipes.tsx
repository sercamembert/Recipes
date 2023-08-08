"use client";
import { Favourite, Recipe } from "@prisma/client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Trash2 } from "lucide-react";
import { Checkbox } from "./ui/Checkbox";
import { useMutation } from "@tanstack/react-query";
import { RemoveFavouritesRequest } from "@/lib/validators/favourite";
import axios, { AxiosError } from "axios";
import useCustomToast from "@/hooks/use-custom-toast";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/Alert-dialog";

interface FavouriteRecipe extends Favourite {
  recipe: Recipe;
}

interface Props {
  favouriteRecipes: FavouriteRecipe[];
}

const FavouriteRecipes = ({ favouriteRecipes }: Props) => {
  const [checkedRecipes, setCheckedRecipes] = useState<string[]>([]);
  const { loginToast } = useCustomToast();
  const router = useRouter();

  const { mutate: removeRecipes } = useMutation({
    mutationFn: async ({ checkedRecipes }: RemoveFavouritesRequest) => {
      const payload: RemoveFavouritesRequest = { checkedRecipes };
      const { data } = await axios.patch("/api/remove/favourites", payload);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }
      return toast({
        title: "Something went wrong",
        description:
          "We could not remove checked recipes from favourite, please try again later.",
        variant: "destructive",
      });
    },
    onSuccess: async () => {
      setCheckedRecipes([]);
      router.refresh();
    },
  });

  const handleCheckboxClick = (recipeId: string) => {
    if (checkedRecipes.includes(recipeId)) {
      setCheckedRecipes(checkedRecipes.filter((id) => id !== recipeId));
    } else {
      setCheckedRecipes([...checkedRecipes, recipeId]);
    }
  };
  return (
    <>
      {checkedRecipes.length >= 1 ? (
        <AlertDialog>
          <AlertDialogTrigger>
            <div className="flex gap-1 mt-10 mb-1">
              <Trash2 />
              <p className="cursor-pointer underline hover:underline-primary">
                Remove checked recipes
              </p>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently remove
                checked recipes from favourite.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border-zinc-400">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  const checkedRecipeObjects = checkedRecipes.map(
                    (recipeId) => ({
                      recipeId,
                    })
                  );
                  removeRecipes({ checkedRecipes: checkedRecipeObjects });
                }}
              >
                Remove
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <p className="mt-10 mb-1"></p>
      )}
      <div className="w-full absolute grid grid-cols-2 md:grid-cols-4 gap-4 grid-rows-2 lg:grid-rows-1">
        {favouriteRecipes.map((recipe, index) => (
          <div
            key={index}
            className="flex flex-col bg-rose rounded-md relative"
          >
            <Link href={`/recipe/${recipe.recipe.id}`}>
              <Image
                src={recipe.recipe.image}
                alt="photo of similar recipe"
                width={800}
                height={600}
                quality={100}
                className=" rounded-t-md aspect-[.5/.4] hover:rounded-b-md hover:scale-105 ease-in-out duration-200 cursor-pointer"
              />

              <div className="flex justify-between p-2">
                <p className="">{recipe.recipe.title}</p>
                <ArrowRight />
              </div>
            </Link>
            <Checkbox
              className="absolute right-2 top-2 bg-white"
              onClick={() => {
                handleCheckboxClick(recipe.recipe.id);
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default FavouriteRecipes;

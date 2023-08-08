"use client";
import {
  Ingredient,
  Recipe,
  Step,
  User,
  Comment,
  Favourite,
} from "@prisma/client";

import { Session } from "next-auth";
import React, { useState } from "react";
import AddToFavourite from "./AddToFavourite";
import { formatTimeToNow } from "@/lib/utils";
import { Clock10, Trash2, Users2 } from "lucide-react";
import { Button } from "./ui/Button";
import { useMutation } from "@tanstack/react-query";
import { DeleteCreatedRequest } from "@/lib/validators/created";
import axios, { AxiosError } from "axios";
import useCustomToast from "@/hooks/use-custom-toast";
import { redirect, useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
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

interface ExtendedRecipe extends Recipe {
  author: User;
  steps: Step[];
  ingredients: Ingredient[];
  comments: Comment[];
  favourites: Favourite[];
}

interface Props {
  session: Session | null;
  recipe: ExtendedRecipe;
}

const RecipeInfo = ({ session, recipe }: Props) => {
  const { loginToast } = useCustomToast();
  const router = useRouter();
  const { mutate: removeRecipes } = useMutation({
    mutationFn: async ({ id }: DeleteCreatedRequest) => {
      const payload: DeleteCreatedRequest = { id };
      const { data } = await axios.patch("/api/remove/created", payload);
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
        description: "We cant delete your recipe, please try again later.",
        variant: "destructive",
      });
    },
    onSuccess: async () => {
      redirect("/");
    },
  });

  return (
    <div className="flex flex-col gap-1">
      <h1 className="font-secoundary text-2xl">{recipe.title}</h1>
      <p className="text-xl">Author: {recipe.author?.name}</p>
      <p className="text-sm">
        Posted {formatTimeToNow(new Date(recipe.createdAt))}
      </p>
      <div className="flex gap-4">
        <AddToFavourite userId={session?.user.id} recipe={recipe} />
        <p className="flex items-center gap-1 text-xl">
          <Clock10 width={25} height={25} /> {recipe.prepTime}min
        </p>
        <p className="flex items-center gap-1 text-xl">
          <Users2 width={25} height={25} /> {recipe.peoples}
        </p>
      </div>
      {recipe.authorId === session?.user.id && (
        <AlertDialog>
          <AlertDialogTrigger className="w-[40px] mt-2 ">
            <Button variant="rose" size={"sm"}>
              <Trash2 />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                recipe.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => removeRecipes({ id: recipe.id })}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default RecipeInfo;

import React, { useState } from "react";
import {
  Ingredient,
  Recipe,
  Step,
  User,
  Comment,
  Favourite,
} from "@prisma/client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import { Heart } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import useCustomToast from "@/hooks/use-custom-toast";

interface ExtendedRecipe extends Recipe {
  favourites: Favourite[];
}

interface Props {
  userId: String | undefined;
  recipe: ExtendedRecipe;
}

interface favouriteRequest {
  isFavourite: Boolean;
  recipeId: String;
}

const AddToFavourite = ({ userId, recipe }: Props) => {
  const { loginToast } = useCustomToast();
  const router = useRouter();
  const recipeId = recipe.id;
  const [isFavourite, setIsFavourite] = useState(
    recipe.favourites.some((fav) => fav.userId === userId)
  );

  const [favouriteCount, setFavouriteCount] = useState<number>(
    recipe.favourites.length
  );

  const { mutate: addToFavourite } = useMutation({
    mutationFn: async ({ isFavourite, recipeId }: favouriteRequest) => {
      const payload: favouriteRequest = { isFavourite, recipeId };
      const { data } = await axios.patch("/api/recipe/favourite", payload);
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
        description: "Your vote was not registered please try again.",
        variant: "destructive",
      });
    },
    onSuccess: async (data) => {
      setIsFavourite(data.isFavourite);
      setFavouriteCount((prevCount) =>
        data.isFavourite ? prevCount + 1 : prevCount - 1
      );
    },
  });

  return (
    <div className="flex gap-1 items-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Heart
              className="text-red-600 cursor-pointer"
              color={isFavourite ? "#dc2626" : "#000"}
              fill={isFavourite ? "#dc2626" : "none"}
              onClick={() => addToFavourite({ isFavourite, recipeId })}
              width={25}
              height={25}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {isFavourite ? "Remove from favourites" : "Add to favourites"}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <p className="text-xl">{favouriteCount}</p>
    </div>
  );
};

export default AddToFavourite;

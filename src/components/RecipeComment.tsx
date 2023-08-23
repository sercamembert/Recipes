import { formatTimeToNow } from "@/lib/utils";
import { Recipe, User, Comment } from "@prisma/client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Session } from "next-auth";
import CreateComment from "./CreateComment";

interface ExtendedComment extends Comment {
  author: User;
}

interface Props {
  comments: ExtendedComment[];
  recipeId: string;
}

const RecipeComment = ({ comments, recipeId }: Props) => {
  return (
    <div className="w-full  flex flex-col gap-4">
      <h1 className="text-2xl font-secoundary">Comments</h1>
      {comments.map((comment, index) => (
        <div key={index} className="flex gap-2 w-full">
          <Avatar>
            <AvatarImage src={comment.author.image ?? ""} />
          </Avatar>
          <div className="flex flex-col gap-0 w-[85%]">
            <p className="text-sm font-semibold">
              {comment.author.name}{" "}
              <span className="font-light ml-1">
                {formatTimeToNow(new Date(comment.createdAt))}
              </span>
            </p>
            <p className="text-sm break-words w-full">{comment.text}</p>
          </div>
        </div>
      ))}
      <CreateComment recipeId={recipeId} />
    </div>
  );
};

export default RecipeComment;

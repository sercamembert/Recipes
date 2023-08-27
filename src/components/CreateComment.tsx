"use client";
import React, { useEffect, useRef, useState } from "react";
import { Textarea } from "./ui/Textarea";
import { Button } from "./ui/Button";
import { CommentRequest } from "@/lib/validators/comment";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
interface Props {
  recipeId: string;
}

const CreateComment = ({ recipeId }: Props) => {
  const [input, setInput] = useState<string>("");
  const router = useRouter();
  const [isRequesting, setIsRequesting] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [input]);

  const { mutate: postComment, isLoading } = useMutation({
    mutationFn: async ({ recipeId, text }: CommentRequest) => {
      setIsRequesting(true);
      const payload: CommentRequest = {
        recipeId,
        text,
      };

      const { data } = await axios.post(`/api/recipe/comment`, payload);
      return data;
    },
    onError: () => {
      setIsRequesting(false);
      return toast({
        title: "Something went wrong",
        description: "Comment could not be posted, please try again later",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      setIsRequesting(false);
      router.refresh();
      setInput("");
    },
  });

  return (
    <div className="w-full">
      <div className="flex gap-1 items-center mb-1">
        <h1 className="text-lg font-secoundary">Tasted?</h1>
        <p className="text-sm">Share your feedback.</p>
      </div>
      <Textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Write comment"
      />
      <Button
        variant={"rose"}
        size={"sm"}
        className="mt-2 text-xs"
        disabled={isRequesting}
        onClick={() => {
          if (!input) return;
          postComment({
            recipeId,
            text: input,
          });
        }}
      >
        Post comment
      </Button>
    </div>
  );
};

export default CreateComment;

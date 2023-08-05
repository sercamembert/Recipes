import CreateRecipeForm from "@/components/CreateRecipeForm";
import { authOptions, getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

export const metadata = {
  title: "Create recipe",
};

const page = async () => {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect(authOptions.pages?.signIn || "/sign-in");
  }

  return (
    <div className="w-full mt-10">
      <CreateRecipeForm
        user={{ id: session.user.id, username: session.user.username || "" }}
      />
    </div>
  );
};

export default page;

import React, { FC } from "react";
import SignIn from "@/components/SignIn";

const page: FC = () => {
  return (
    <div className="h-screen ">
      <div className="h-full max-w-2xl mx-auto flex  items-center justify-center  ">
        <SignIn />
      </div>
    </div>
  );
};

export default page;

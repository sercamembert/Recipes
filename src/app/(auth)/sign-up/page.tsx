import React, { FC } from "react";
import SignUp from "@/components/SignUp";

const page: FC = () => {
  return (
    <div className="h-screen ">
      <div className="h-full max-w-2xl mx-auto flex  items-center justify-center  ">
        <SignUp />
      </div>
    </div>
  );
};

export default page;

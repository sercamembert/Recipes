import { Step } from "@prisma/client";
import React from "react";

interface Props {
  steps: Step[];
}

const Steps = ({ steps }: Props) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <h1 className="text-2xl font-secoundary">Instructions</h1>

      {steps.map((step, index) => (
        <div key={index} className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold">Step {index + 1}</h1>
          <p className="text-lg break-words">{step.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Steps;

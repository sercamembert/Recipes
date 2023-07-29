"use client";
import { FC } from "react";
import { Command, CommandInput } from "./ui/Command";

interface SearchbarProps {}

const Searchbar: FC<SearchbarProps> = ({}) => {
  return (
    <Command className="relative w-[300px] rounded-lg border z-50 overflow-visible">
      <CommandInput
        placeholder="Search recipes..."
        className="outline-none border-none focus:border-none focus:outline-none ring-0"
      />
    </Command>
  );
};

export default Searchbar;

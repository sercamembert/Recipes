"use client";
import { FC, useState } from "react";
import { Command, CommandInput } from "./ui/Command";
import { CommandList } from "cmdk";
import { Input } from "./ui/Input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

interface SearchbarProps {}

const Searchbar: FC<SearchbarProps> = ({}) => {
  const [input, setInput] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSearch = () => {
    router.push(`/search/${input}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const router = useRouter();

  return (
    <div className="relative ml-2">
      <Input
        type="text"
        placeholder="Search recipes..."
        className="mx-auto w-full sm:w-[300px] lg:w-[400px] rounded-md border-primary border focus:outline-none ring-0 pr-10"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 ">
        <Search
          className="h-5 w-5 hover:text-rose cursor-pointer"
          onClick={handleSearch}
        />
      </div>
    </div>
  );
};

export default Searchbar;

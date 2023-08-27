"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { categories } from "@/lib/categories";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/Navigation";
import Link from "next/link";

interface FiltersProps {
  defaultOrder: string;
  input: string;
  defaultCategory: string;
}

const SearchFilters: React.FC<FiltersProps> = ({
  defaultOrder,
  input,
  defaultCategory,
}) => {
  const router = useRouter();

  return (
    <div className="flex flex-col w-auto">
      <Link
        className="text-xs underline w-auto"
        href={`/search/${input}/default/auto`}
      >
        clear filters
      </Link>
      <div className="filters bg-rose py-1 flex flex-col sm:flex-row gap-x-5">
        <div>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-xl uppercase font-secoundary">
                  Categories
                </NavigationMenuTrigger>
                <NavigationMenuContent className="border-rose bg-rose pl-4">
                  <ul className="flex flex-col w-[174px]">
                    {Object.keys(categories).map((category, index) => (
                      <Link
                        key={index}
                        href={`/search/${input}/${category}/${defaultOrder}`}
                        className="text-dark hover:text-white"
                      >
                        {category}
                      </Link>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex gap-3 ">
          <div className="flex items-center justify-center gap-1 pl-4">
            <input
              type="radio"
              checked={defaultOrder === "auto" && true}
              onChange={() => {
                router.push(`/search/${input}/${defaultCategory}/auto`);
              }}
            />
            <p className="text-sm">Random</p>
          </div>
          <div className="flex items-center justify-center gap-1">
            <input
              type="radio"
              checked={defaultOrder === "newest" && true}
              onChange={() => {
                router.push(`/search/${input}/${defaultCategory}/newest`);
              }}
            />
            <p className="text-sm">New</p>
          </div>
          <div className="flex items-center justify-center gap-1">
            <input
              type="radio"
              checked={defaultOrder === "shortest" && true}
              onChange={() => {
                router.push(`/search/${input}/${defaultCategory}/shortest`);
              }}
            />
            <p className="text-sm">Quick</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;

"use client";
import React, { useState } from "react";
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
  category: string;
  defaultSubcategory: string;
  defaultOrder: string;
}

const Filters: React.FC<FiltersProps> = ({
  category,
  defaultSubcategory,
  defaultOrder,
}) => {
  const router = useRouter();

  return (
    <div className="flex flex-col w-auto">
      <Link
        className="text-xs underline w-auto"
        href={`/recipes/${category}/default/auto`}
      >
        clear filters
      </Link>
      <div className="filters bg-rose py-1 flex gap-5">
        <div>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-xl uppercase">
                  Subcategories
                </NavigationMenuTrigger>
                <NavigationMenuContent className="border-rose bg-rose p-3">
                  <ul className="flex flex-col w-[174px]">
                    {categories[category]?.map((subcategory, index) => (
                      <Link
                        key={index}
                        href={`/recipes/${category}/${subcategory}/${defaultOrder}`}
                        className={
                          defaultSubcategory === subcategory
                            ? "text-white"
                            : "hover:text-white"
                        }
                      >
                        {subcategory}
                      </Link>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center justify-center gap-1">
            <input
              type="radio"
              checked={defaultOrder === "default" && true}
              onChange={() => {
                router.push(
                  `/recipes/${category}/${defaultSubcategory}/default`
                );
              }}
            />
            <p className="text-sm">Random</p>
          </div>
          <div className="flex items-center justify-center gap-1">
            <input
              type="radio"
              checked={defaultOrder === "newest" && true}
              onChange={() => {
                router.push(
                  `/recipes/${category}/${defaultSubcategory}/newest`
                );
              }}
            />
            <p className="text-sm">New</p>
          </div>
          <div className="flex items-center justify-center gap-1">
            <input
              type="radio"
              checked={defaultOrder === "shortest" && true}
              onChange={() => {
                router.push(
                  `/recipes/${category}/${defaultSubcategory}/shortest`
                );
              }}
            />
            <p className="text-sm">Quick</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;

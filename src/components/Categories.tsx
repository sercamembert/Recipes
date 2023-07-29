"use client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/Navigation";
import Link from "next/link";

interface Props {}

const Categories = () => {
  return (
    <NavigationMenu className="ml-5 hover:bg-rose hidden lg:block">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-xl uppercase font-secoundary">
            Categories
          </NavigationMenuTrigger>
          <NavigationMenuContent className="border-rose">
            <ul className="flex flex-col w-[174px] ">
              <Link
                href="/"
                className=" font-medium cursor-pointer bg-rose py-2 px-4 hover:brightness-75 ease-in-out duration-200"
              >
                Main Dishes
              </Link>
              <Link
                href="/"
                className=" font-medium cursor-pointer bg-rose py-2 px-4 hover:brightness-75 ease-in-out duration-200"
              >
                Soups
              </Link>
              <Link
                href="/"
                className=" font-medium cursor-pointer bg-rose py-2 px-4 hover:brightness-75 ease-in-out duration-200"
              >
                Salads
              </Link>
              <Link
                href="/"
                className=" font-medium cursor-pointer bg-rose py-2 px-4 hover:brightness-75 ease-in-out duration-200"
              >
                Snacks
              </Link>
              <Link
                href="/"
                className=" font-medium cursor-pointer bg-rose py-2 px-4 hover:brightness-75 ease-in-out duration-200"
              >
                Desserts
              </Link>
              <Link
                href="/"
                className=" font-medium cursor-pointer bg-rose py-2 px-4 hover:brightness-75 ease-in-out duration-200"
              >
                Cakes
              </Link>
              <Link
                href="/"
                className=" font-medium cursor-pointer bg-rose py-2 px-4 hover:brightness-75 ease-in-out duration-200"
              >
                Grill
              </Link>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Categories;

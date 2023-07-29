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
import { ChefHat, Plus } from "lucide-react";
import { User } from "next-auth";
import { signOut } from "next-auth/react";

interface UserAccountNavProps {
  user: Pick<User, "name" | "image" | "email"> | undefined;
}

const NavbarUser = ({ user }: UserAccountNavProps) => {
  return (
    <div className="ml-auto gap-2 hidden lg:flex items-center">
      <div className="w-12 h-12 bg-primary text-white flex items-center justify-center rounded-md cursor-pointer hover:brightness-75 ease-in-out duration-200">
        <Plus />
      </div>
      <NavigationMenu className="hover:bg-rose hidden lg:block py-2">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="flex justify-start  items-left w-[95px]">
              <ChefHat className="w-12 h-12 " />
            </NavigationMenuTrigger>
            <NavigationMenuContent className="border-rose">
              <ul className="flex flex-col w-auto ">
                {user?.email ? (
                  <div className="bg-rose py-2 px-4">
                    <p className="font-bold text-sm">{user.name}</p>
                    <p className="font-semibold text-xs">
                      {user.email.length > 13
                        ? `${user.email.slice(0, 13)}...`
                        : user.email}
                    </p>
                  </div>
                ) : null}

                {!user ? (
                  <Link
                    href="/sign-in"
                    className=" font-medium cursor-pointer bg-rose py-2 px-4 hover:brightness-75 ease-in-out duration-200"
                  >
                    Sign In
                  </Link>
                ) : null}

                <Link
                  href="/create"
                  className=" font-medium cursor-pointer bg-rose py-2 px-4 hover:brightness-75 ease-in-out duration-200"
                >
                  Create
                </Link>
                <Link
                  href="/created"
                  className=" font-medium cursor-pointer bg-rose py-2 px-4 hover:brightness-75 ease-in-out duration-200 w-auto whitespace-nowrap"
                >
                  My recipes
                </Link>
                <Link
                  href="/favourites"
                  className=" font-medium cursor-pointer bg-rose py-2 px-4 hover:brightness-75 ease-in-out duration-200"
                >
                  Favourites
                </Link>

                <Link
                  href="/settings"
                  className=" font-medium cursor-pointer bg-rose py-2 px-4 hover:brightness-75 ease-in-out duration-200"
                >
                  Settings
                </Link>
                {user && (
                  <p
                    onClick={() => {
                      signOut({
                        callbackUrl: `${window.location.origin}/sign-in`,
                      });
                    }}
                    className=" font-medium cursor-pointer bg-rose py-2 px-4 hover:brightness-75 ease-in-out duration-200"
                  >
                    Sign Out
                  </p>
                )}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default NavbarUser;

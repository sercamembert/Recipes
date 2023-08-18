"use client";
import React from "react";
import { Facebook, Instagram, Menu, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import Searchbar from "./Searchbar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/Sheet";
import { signOut } from "next-auth/react";
import { User } from "next-auth";

interface Props {
  user: Pick<User, "name" | "image" | "email"> | undefined;
}

const NavbarWindow = ({ user }: Props) => {
  return (
    <Sheet>
      <SheetTrigger asChild className="block lg:hidden ml-auto">
        <div className="w-12 h-12 bg-primary text-white flex items-center justify-center rounded-md cursor-pointer hover:brightness-75 ease-in-out duration-200">
          <Menu className="w-8 h-8" />
        </div>
      </SheetTrigger>
      <SheetContent className="bg-rose w-full sm:w-[400px] " side="right">
        <div className="flex flex-col items-center justify-start h-full font-secoundary text-3xl pt-20">
          <a
            href="/"
            className="p-4 w-full text-center hover:brightness-75 ease-in-out duration-200 bg-rose"
          >
            Home
          </a>

          <div className="w-3/4 border-b border-dark m-2"></div>
          {!user ? (
            <a
              href="/sign-in"
              className=" font-medium cursor-pointer bg-rose py-2 px-4 hover:brightness-75 ease-in-out duration-200"
            >
              Sign In
            </a>
          ) : null}

          <a
            href="/create"
            className=" font-medium cursor-pointer bg-rose py-2 px-4 hover:brightness-75 ease-in-out duration-200"
          >
            Create
          </a>
          <a
            href="/created"
            className=" font-medium cursor-pointer bg-rose py-2 px-4 hover:brightness-75 ease-in-out duration-200 w-auto whitespace-nowrap"
          >
            My recipes
          </a>
          <a
            href="/favourites"
            className=" font-medium cursor-pointer bg-rose py-2 px-4 hover:brightness-75 ease-in-out duration-200"
          >
            Favourites
          </a>

          <a
            href="/settings"
            className=" font-medium cursor-pointer bg-rose py-2 px-4 hover:brightness-75 ease-in-out duration-200"
          >
            Settings
          </a>
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
          <div className="w-3/4 border-b border-dark m-2"></div>
          <div className="flex gap-4 w-3/4 justify-center pt-4">
            <Instagram className="cursor-pointer" />
            <Facebook className="cursor-pointer" />
            <Twitter className="cursor-pointer" />
            <Youtube className="cursor-pointer" />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NavbarWindow;

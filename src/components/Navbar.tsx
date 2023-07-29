import React from "react";
import Logo from "./ui/Logo";
import { Facebook, Instagram, Menu, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import Searchbar from "./Searchbar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/Sheet";
import Categories from "./Categories";
import NavbarUser from "./NavbarUser";
import { getAuthSession } from "@/lib/auth";
import { User } from "next-auth";

const Navbar = async () => {
  const session = await getAuthSession();

  return (
    <div className="h-16 lg:h-20 py-2 flex items-center fixed top-0 z-10 left-0 right-0 px-[15px] lg:px-[5vw] 2xl:px-[9vw]">
      <Logo />

      <Categories />

      {/* TODO: Searchbar */}
      {/* <Searchbar /> */}

      <NavbarUser user={session?.user} />

      <Sheet>
        <SheetTrigger asChild className="block lg:hidden ml-auto">
          <div className="w-12 h-12 bg-primary text-white flex items-center justify-center rounded-md cursor-pointer hover:brightness-75 ease-in-out duration-200">
            <Menu className="w-8 h-8" />
          </div>
        </SheetTrigger>
        <SheetContent className="bg-rose w-full sm:w-[400px] " side="right">
          <div className="flex flex-col items-center justify-start h-full font-secoundary text-3xl pt-20">
            <Link
              href="/"
              className="p-4 w-full text-center hover:brightness-75 ease-in-out duration-200 bg-rose"
            >
              Home
            </Link>
            <Link
              href="/"
              className="p-4 w-full text-center hover:brightness-75 ease-in-out duration-200 bg-rose"
            >
              Categories
            </Link>
            <Link
              href="/"
              className="p-4 w-full text-center hover:brightness-75 ease-in-out duration-200 bg-rose "
            >
              Newsletter
            </Link>
            <div className="w-3/4 border-b border-dark m-2"></div>
            <Link
              href="/sign-in"
              className="p-4 w-full text-center hover:brightness-75 ease-in-out duration-200 bg-rose"
            >
              Sign in
            </Link>
            <Link
              href="/"
              className="p-4 w-full text-center hover:brightness-75 ease-in-out duration-200 bg-rose"
            >
              Add recipe
            </Link>
            <Link
              href="/"
              className="p-4 w-full text-center hover:brightness-75 ease-in-out duration-200 bg-rose"
            >
              Settings
            </Link>
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
    </div>
  );
};

export default Navbar;

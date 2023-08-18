import React from "react";
import Logo from "./ui/Logo";
import { Facebook, Instagram, Menu, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import Searchbar from "./Searchbar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/Sheet";
import Categories from "./NavCategories";
import NavbarUser from "./NavbarUser";
import { getAuthSession } from "@/lib/auth";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import NavbarWindow from "./NavbarWindow";

const Navbar = async () => {
  const session = await getAuthSession();

  return (
    <div className="h-16 lg:h-20 py-2 flex items-center fixed top-0 z-10 left-0 right-0 px-[15px] lg:px-[5vw] 2xl:px-[9vw] bg-green-50">
      <Logo />

      <Categories />

      {/* TODO: Searchbar */}
      {/* <Searchbar /> */}

      <NavbarUser user={session?.user} />

      <NavbarWindow user={session?.user} />
    </div>
  );
};

export default Navbar;

import Image from "next/image";
import React from "react";
import Logo from "./ui/Logo";
import { Input } from "./ui/Input";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

interface Props {}

const Footer = () => {
  return (
    <div className="flex flex-col">
      <div className=" bg-light flex flex-col w-full gap-1 items-center justify-center px-2 py-20">
        <h1 className="font-secoundary text-2xl lg:text-3xl font-medium balance text-center">
          Flavorful Delights, Straight to Your Inbox!
        </h1>
        <p className="text-lg font-medium balance text-center">
          Indulge in our Weekly Culinary Selections and Expert Recommendations
        </p>
        <div className="flex mt-2">
          <Input
            placeholder="example@gmail.com"
            className="border-none rounded-none rounded-l-md"
          />
          <Button variant={"rose"} className="rounded-none rounded-r-md">
            <ArrowRight />
          </Button>
        </div>
      </div>
      <footer className="bg-green-50 w-full  ">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <Logo />

            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <a href="#" className="mr-4 hover:underline md:mr-6 ">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="mr-4 hover:underline md:mr-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="mr-4 hover:underline md:mr-6 ">
                  Licensing
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span>© 2023 Recipes™. All Rights Reserved.</span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

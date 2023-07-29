import React from "react";
import logoImg from "../../img/logo/logo.png";
import Image from "next/image";
interface Props {}

const Logo = () => {
  return (
    <a
      href="/"
      className="flex items-center justify-center gap-1 cursor-default "
    >
      <Image
        src={logoImg}
        alt="logo"
        className="w-12 h-12 lg:h-14 lg:w-14 cursor-pointer"
      />
      <h1 className="text-3xl text-primary font-special cursor-pointer hover:underline hidden lg:block">
        Recipes
      </h1>
    </a>
  );
};

export default Logo;

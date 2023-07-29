import React from "react";
import Link from "next/link";
import UserAuthForm from "./UserAuthForm";
import logoImg from "@/img/logo/logo.png";
import Image from "next/image";
const SignIn = () => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px] ">
      <div className="flex flex-col space-y-2 text-center">
        <Image src={logoImg} alt="logo" className="w-14 h-14 m-auto" />
        <h1 className="text-4xl font-semibold tracking-tighter font-special">
          Sign Up
        </h1>
        <p className="text-sm max-w-xs mx-auto">
          By continuing, you are setting up a Recipes account and agree to our
          User Agreement and Privacy Policy.
        </p>

        <UserAuthForm />

        <p className="px-8 text-center text-zinc-700 text-sm">
          Already have account?{" "}
          <Link
            href="/sign-in"
            className="hover:text-primary text-sm underline underline-offset-4"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;

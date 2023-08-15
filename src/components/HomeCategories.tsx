"use client";
import React from "react";
import mainDishesImg from "@/img/categories/main.png";
import soupsImg from "@/img/categories/soups.png";
import saladsImg from "@/img/categories/salads.png";
import snacksImg from "@/img/categories/snacks.png";
import dessertsImg from "@/img/categories/desserts.png";
import cakesImg from "@/img/categories/cakes.png";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
interface Props {}

const HomeCategories = () => {
  const router = useRouter();
  return (
    <div className="w-full grid gap-4 grid-cols-2 sm:grid-cols-3  md:grid-cols-6">
      <div className="flex flex-col items-center">
        <Image
          src={mainDishesImg}
          alt="main dishes category"
          className="rounded-[50%] hover:brightness-75 ease-in-out duration-200 cursor-pointer"
          onClick={() => router.push("/categories/")}
        />
        <p className="text-center text-xl font-semibold">Main dishes</p>
      </div>

      <div className="flex flex-col items-center">
        <Image
          className="rounded-[50%] hover:brightness-75 ease-in-out duration-200 cursor-pointer"
          src={soupsImg}
          alt="soups category "
          onClick={() => router.push("/categories/")}
        />
        <p className="text-center text-xl font-semibold">Soups</p>
      </div>

      <div className="flex flex-col items-center">
        <Image
          className="rounded-[50%] hover:brightness-75 ease-in-out duration-200 cursor-pointer"
          src={saladsImg}
          alt="salads category"
          onClick={() => router.push("/categories/")}
        />
        <p className="text-center text-xl font-semibold">Salads</p>
      </div>

      <div className="flex flex-col items-center">
        <Image
          className="rounded-[50%] hover:brightness-75 ease-in-out duration-200 cursor-pointer"
          src={snacksImg}
          alt="snacks category"
          onClick={() => router.push("/categories/")}
        />
        <p className="text-center text-xl font-semibold">Snacks</p>
      </div>
      <div className="flex flex-col items-center">
        <Image
          className="rounded-[50%] hover:brightness-75 ease-in-out duration-200 cursor-pointer"
          src={dessertsImg}
          alt="desserts category"
          onClick={() => router.push("/categories/")}
        />
        <p className="text-center text-xl font-semibold">Desserts</p>
      </div>
      <div className="flex flex-col items-center">
        <Image
          className="rounded-[50%] hover:brightness-75 ease-in-out duration-200  cursor-pointer"
          src={cakesImg}
          alt="cakes category"
          onClick={() => router.push("/categories/")}
        />
        <p className="text-center text-xl font-semibold">Cakes</p>
      </div>
    </div>
  );
};

export default HomeCategories;

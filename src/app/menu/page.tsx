//import { menu } from "@/data";
import { MenuType } from "@/types/types";
import Link from "next/link";
import React from "react";

const getData = async () => {
  const res = await fetch(process.env.NEXTAUTH_URL + "/api/categories");
  if (!res.ok) {
    throw new Error("Failed");
  } else {
    return res.json();
  }
};

export default async function Menu() {
  const menu: MenuType = await getData();
  return (
    <div className="p-4 lg:px-10 xl:px-20 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col md:flex-row items-center">
      {menu.map((category) => (
        <Link
          href={`/menu/${category.slug}`}
          key={category.id}
          className="w-full h-1/3 bg-cover p-8 md:h-1/2"
          style={{ backgroundImage: `url(${category.img})` }}
        >
          <div className={`text-${category.color} w-1/2`}>
            <h1 className="uppercase font-bold text-sm md:text-3xl">
              {category.title}
            </h1>
            <p className="text-sm my-2">{category.desc}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

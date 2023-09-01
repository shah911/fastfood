//import { pizzas } from "@/data";
import { ProductType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const getData = async (category: string) => {
  const res = await fetch(
    process.env.NEXTAUTH_URL + `/api/products?cat=${category}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed");
  } else {
    return res.json();
  }
};

type Props = {
  params: { category: string };
};

export default async function category({ params }: Props) {
  const products: ProductType[] = await getData(params.category);

  return (
    <div className="flex flex-wrap text-red-500">
      {products.map((item) => (
        <Link
          className="w-full h-[60vh] border-r-2 border-b-2 border-red-500 sm:w-1/2 md:w-1/3 p-4 flex flex-col justify-between group even:bg-fuchsia-50"
          href={`/product/${item.id}`}
          key={item.id}
        >
          {/* IMAGE CONTAINER */}
          {item.img && (
            <div className="relative h-[80%]">
              <Image src={item.img} alt="" fill className="object-contain" />
            </div>
          )}
          {/* TEXT CONTAINER */}
          <div className="flex items-center justify-between font-bold">
            <h1 className="text-2xl">{item.title}</h1>
            <h2 className="group-hover:hidden">${item.price}</h2>
            <button className="hidden group-hover:block uppercase bg-red-500 text-white p-2 rounded-md">
              Add to Cart
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
}

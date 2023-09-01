import Image from "next/image";
//import { singleProduct } from "@/data";
import React from "react";
import Price from "@/components/Price";
import { ProductType } from "@/types/types";
import DeleteButton from "@/components/DeleteButton";

const getData = async (id: string) => {
  const res = await fetch(process.env.NEXTAUTH_URL + `/api/products/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed");
  } else {
    return res.json();
  }
};

export default async function SingleProductpage({
  params,
}: {
  params: { id: string };
}) {
  const singleProduct: ProductType = await getData(params.id);
  return (
    <div className="p-4 lg:px-10 xl:px-20 h-screen flex flex-col justify-around text-red-500 md:flex-row md:gap-8 md:items-center relative">
      {/* IMAGE CONTAINER */}
      {singleProduct.img && (
        <div className="relative w-full h-1/2">
          <Image
            src={singleProduct.img}
            alt=""
            fill
            className="object-contain"
          />
        </div>
      )}
      {/* TEXT CONTAINER */}
      <div className="h-1/2 flex flex-col gap-4">
        <h1 className="text-3xl font-bold uppercase">{singleProduct.title}</h1>
        <p>{singleProduct.desc}</p>
        <Price product={singleProduct} />
      </div>
      <DeleteButton id={singleProduct.id} />
    </div>
  );
}

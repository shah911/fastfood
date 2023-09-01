"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const data = [
  {
    id: 1,
    title: "Savor the Speed: Fast Food Delivered in a Dash!",
    img: "/slide1.png",
  },
  {
    id: 2,
    title: "Quick Bites, Speedy Delights: Fast Food at Your Fingertips",
    img: "/slide2.png",
  },
  {
    id: 3,
    title: "Fuel Your Hunger, Pronto! Fast Food in Minutes",
    img: "/slide3.jpg",
  },
];

export default function Slider() {
  const [currentslide, setCurrentSlide] = useState(0);
  // useEffect(() => {
  //   const interval = setInterval(
  //     () =>
  //       setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1)),
  //     2000
  //   );
  //   return () => clearInterval(interval);
  // }, []);
  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] lg:flex-row bg-fuchsia-50">
      <div className="flex-1 flex items-center justify-center flex-col gap-8 font-bold text-red-500 lg:h-full">
        <h1 className="text-xl text-center uppercase p-4 md:px-10 py-0 md:text-4xl lg:text-5xl">
          {data[currentslide].title}
        </h1>
        <button className="bg-red-500 text-white py-2 px-6">Order Now</button>
      </div>
      <div className="flex-1 relative lg:h-full">
        <Image
          src={data[currentslide].img}
          alt=""
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}

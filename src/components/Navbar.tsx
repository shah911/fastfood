import Link from "next/link";
import React from "react";
import Menu from "./Menu";
import CartIcon from "./CartIcon";
import Image from "next/image";
import UserLinks from "./UserLinks";

export default function Navbar() {
  return (
    <div className="h-12 text-red-500 p-4 flex items-center justify-between border-b-2 border-b-red-500 uppercase md:h-24 lg:px-10 xl:px-20">
      <div className="hidden md:flex items-center justify-evenly flex-[1]">
        <Link href="/">Home</Link>
        <Link href="/menu">Menu</Link>
      </div>
      <div className="text-xl md:font-bold flex-[1] md:text-center md:text-3xl lg:text-4xl">
        <Link href="/">Shah.</Link>
      </div>
      <div className="md:hidden">
        <Menu />
      </div>
      <div className="hidden md:flex items-center justify-evenly flex-[1]">
        <UserLinks />
        <CartIcon />
      </div>
    </div>
  );
}

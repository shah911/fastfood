"use client";
import Loader from "@/components/Loader/Loader";
import { useSession, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function login() {
  const { data, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <Loader />;
  } else if (status === "authenticated") {
    router.push("/");
  } else {
    return (
      <div className="p-4 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex justify-center">
        {/* BOX */}
        <div className="h-full shadow-2xl rounded-md flex flex-col md:flex-row md:h-full md:w-full lg:w-[60%]">
          <div className="relative h-1/3 w-full md:h-full md:w-1/2">
            <Image className="object-cover" src="/loginBg.png" alt="" fill />
          </div>
          {/* FORM CONTAINER */}
          <div className="p-10 flex flex-col gap-8 md:w-1/2">
            <h1 className="font-bold text-xl">Welcome</h1>
            <p className="">
              Log into your account or create a new one using social buttons
            </p>
            <button
              onClick={() => signIn("google")}
              className="flex gap-4 p-4 ring-1 ring-orange-100 rounded-md"
            >
              <Image
                className="object-contain"
                src="/google.png"
                alt=""
                width={20}
                height={20}
              />
              <span>Sign in with Google</span>
            </button>
            <button className="flex gap-4 p-4 ring-1 ring-blue-100 rounded-md">
              <Image
                className="object-contain"
                src="/facebook.png"
                alt=""
                width={20}
                height={20}
              />
              <span>Sign in with Facebook</span>
            </button>
            <p className="text-sm">
              Have a problem?{" "}
              <Link className="underline" href="/">
                Contact us
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

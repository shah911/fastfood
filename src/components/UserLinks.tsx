"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function UserLinks() {
  const { status } = useSession();
  return (
    <div>
      {status === "unauthenticated" ? (
        <Link href="/login">Login</Link>
      ) : (
        <div className="flex items-center justify-center gap-10">
          <Link href="/orders">Orders</Link>
          <span className="cursor-pointer" onClick={() => signOut()}>
            Logout
          </span>
        </div>
      )}
    </div>
  );
}

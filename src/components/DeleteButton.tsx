"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Loader from "./Loader/Loader";

export default function DeleteButton({ id }: { id: string }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const handleDelete = async () => {
    const res = await fetch(`http://localhost:3000/api/products/${id}`, {
      method: "DELETE",
    });
    if (res.status === 200) {
      router.push("/menu");
      toast("The Product has been deeted");
    } else {
      const data = await res.json();
      toast.error(data.message);
    }
  };

  if (status === "loading") {
    return <Loader />;
  } else if (status === "unauthenticated" || !session?.user.isAdmin) {
    return;
  } else {
    return (
      <button
        className="absolute top-4 right-4 bg-red-400 p-2 rounded-full"
        onClick={handleDelete}
      >
        <Image src="/delete.png" alt="" width={20} height={20} />
      </button>
    );
  }
}

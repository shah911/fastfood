"use client";
import Loader from "@/components/Loader/Loader";
import { OrderType } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Orders() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () => fetch("/api/orders").then((res) => res.json()),
  });

  const queryClient = useQueryClient();

  const Mutation = useMutation({
    mutationFn: ({ id, status }: { id: String; status: String }) => {
      return fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements[0] as HTMLInputElement;
    const status = input.value;
    Mutation.mutate({ id, status });
    toast.success("The order status has been updated");
  };

  if (isLoading || status === "loading") {
    return <Loader />;
  } else if (status === "unauthenticated") {
    router.push("/");
  } else {
    return (
      <div className="p-4 lg:px-20 xl:px-40">
        <table className="w-full border-separate border-spacing-1">
          <thead>
            <tr className="text-left">
              <th className="hidden md:block">Order ID</th>
              <th>Date</th>
              <th>Price</th>
              <th className="hidden md:block">Products</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item: OrderType) => (
              <tr
                key={item.id}
                className={`${item.status !== "Delivered" && "bg-red-50"}`}
              >
                <td className="hidden px-1 py-6 md:block">{item.id}</td>
                <td className="px-1 py-6">
                  {item.createdAt.toString().slice(0, 10)}
                </td>
                <td className="px-1 py-6">{item.price}</td>
                <td className="hidden px-1 py-6 md:block">
                  {item.products[0].title}
                </td>
                {session?.user.isAdmin ? (
                  <td>
                    <form
                      className="flex items-center justify-center gap-4"
                      onSubmit={(e) => handleSubmit(e, item.id)}
                    >
                      <input
                        type="text"
                        placeholder={item.status}
                        className="p-2 ring-1 ring-black rounded-md"
                      />
                      <button className="bg-red-400 rounded-full p-2">
                        <Image src="/edit.png" alt="" width={20} height={20} />
                      </button>
                    </form>
                  </td>
                ) : (
                  <td className="px-1 py-6">{item.status}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

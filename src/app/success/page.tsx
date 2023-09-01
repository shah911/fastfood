"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

function page() {
  const SearchParams = useSearchParams();
  const payment_intent = SearchParams.get("payment_intent");
  const router = useRouter();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await fetch(`/api/confirm/${payment_intent}`, {
          method: "PUT",
        });
        router.push("/orders");
      } catch (err) {
        console.log(err);
      }
    };

    makeRequest();
  }, [payment_intent, router]);

  return (
    <div className="h-screen flex flex-col gap-4 items-center justify-center">
      <span className="font-bold text-3xl">Thanks for buying</span>
      <p className="font-light text-xl">
        Don't refresh you will be redirected to orders page
      </p>
    </div>
  );
}

export default page;

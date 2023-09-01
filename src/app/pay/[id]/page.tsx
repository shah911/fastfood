"use client";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/CheckoutForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function page({ params }: { params: { id: string } }) {
  const { status } = useSession();
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState("");
  const { id } = params;
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/create-intent/${id}`,
          {
            method: "POST",
          }
        );
        const data = await res.json();
        setClientSecret(data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, [id]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
      rules: {
        ".Label": {
          fontWeight: "bold",
          fontSize: "1.25rem",
        },
        ".Input": {
          outline: "none",
          padding: "15px",
          borderRadius: "10px",
          background: "transparent",
          border: "1px solid black",
          fontFamily: "Montserrat, sans-serif",
          transition: "all ease 300ms",
        },
        ".Input:focus": {
          borderColor: "#E0E6EB",
        },
      },
    },
  };

  if (status === "loading") {
    return (
      <div className="h-screen flex items-center justify-center">
        LOADING...
      </div>
    );
  } else if (status === "unauthenticated") {
    router.push("/login");
  } else {
    return (
      <div>
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    );
  }
}

export default page;

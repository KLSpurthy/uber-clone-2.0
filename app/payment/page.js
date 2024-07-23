"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import { useSearchParams } from "next/navigation";
import CheckoutForm from "../../components/Home/CheckoutForm";
import React from "react";

function Payment() {
  const searchParam = useSearchParams();
  let amount = parseFloat(searchParam.get("amount"));
  if (isNaN(amount) || amount <= 0)
  {
    console.error("Invalid amount value.Amount must be a number greater than 0.");
    amount = 1
  }
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY
  );
  const options = {
    mode: "payment",
    amount: Math.round(amount * 1000),
    currency: "cad",
  };
  return (
    <div>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm amount={amount} />
      </Elements>
    </div>
  );
}

export default Payment;

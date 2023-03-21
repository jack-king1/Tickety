import React from "react";
import { loadStripe } from "@stripe/stripe-js";

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      "pk_test_51Mo9PbGTuZFzGPicQRhJN8fg3l6IUogza7MdjHnWH3FWu6RraUlLCBBbdqmRYwWKs5MKlIDlfZYjVoggyya055xD00DzavAvug"
    );
  }
  return stripePromise;
};

export default getStripe;

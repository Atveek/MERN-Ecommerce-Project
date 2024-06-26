import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import "./Stripe.css";
import { useSelector } from "react-redux";
import { selectCurrentOrderStatus } from "../features/order/orderSlice";

const stripePromise = loadStripe(
  "pk_test_51PLPhKSJmcBUzd6E3uUMktaGWTengZnDcOvKsBYdpL7JYOXyU5RoDBUw8GK4prrBc4pcbI66ncFvTqc4cVI9gA9N00chkk1I9c"
);

export default function StripeCheckOut() {
  const [clientSecret, setClientSecret] = useState("");
  const currentOrder = useSelector(selectCurrentOrderStatus);

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const customerDetails = {
          name: currentOrder.selectedAddress.name,
          address: {
            line1: currentOrder.selectedAddress.street,
            city: currentOrder.selectedAddress.city,
            state: currentOrder.selectedAddress.state,
            postal_code: currentOrder.selectedAddress.pinCode,
            country: "IN",
          },
        };
        const response = await fetch(
          "https://mern-ekart-project.vercel.app/create-payment-intent",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              items: currentOrder,
              customerDetails,
            }),
          }
        );
        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Error creating payment intent:", error);
      }
    };

    if (currentOrder) {
      createPaymentIntent();
    }
  }, [currentOrder]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Stripe">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

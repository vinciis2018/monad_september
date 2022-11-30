import { useState, useEffect } from "react";

import { Box, Button, Text } from "@chakra-ui/react";
import logo from "assets/logo.png";
import { config } from "config";

import axios from "axios";

export function PaymentGateway({ userInfo, amount, currency, receipt }: any) {
  const [body, setBody] = useState({});

  function loadScript(src: any) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  }

  useEffect(() => {
    if (amount && currency && receipt) {
      setBody({
        amount: amount,
        currency: currency,
        receipt: receipt,
      });
    }
  }, [amount, currency, receipt]);

  const displayRazorpay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // creating a new order
    const result = await axios.post(
      "http://localhost:3333/api/wallet/orders",
      body
    );

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: process.env.REACT_APP_RZP_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: config?.title,
      description: config.description,
      image: { logo },
      order_id: order_id,
      handler: async function (response: any) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await axios.post(
          "http://localhost:3333/api/wallet/success",
          data
        );

        alert(result.data.msg);
      },
      prefill: {
        name: userInfo.name,
        email: userInfo.email,
        contact: userInfo.phone,
      },
      notes: {
        address: config?.companyAddress,
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <Box>
      <Text>
        Amount: {amount}, Currency: {currency}, Receipt: {receipt}
      </Text>
      <Button onClick={displayRazorpay}>Payment</Button>
    </Box>
  );
}

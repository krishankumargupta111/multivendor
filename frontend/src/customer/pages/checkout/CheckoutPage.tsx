import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";

const CheckoutPage = () => {
  const navigate = useNavigate();

  const [payment, setPayment] = useState({
    cardNumber: "",
    cardHolder: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e: any) => {
    setPayment({
      ...payment,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    // Call createOrder API here

    alert("Payment Successful");

    navigate("/order-success");
  };

  return (
    <Card sx={{ maxWidth: 500, margin: "40px auto", p: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Fake Payment
        </Typography>

        <TextField
          fullWidth
          label="Card Number"
          name="cardNumber"
          margin="normal"
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Card Holder Name"
          name="cardHolder"
          margin="normal"
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Expiry (MM/YY)"
          name="expiry"
          margin="normal"
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="CVV"
          name="cvv"
          margin="normal"
          onChange={handleChange}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Pay Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default CheckoutPage;
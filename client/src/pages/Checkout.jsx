import { useFormik } from "formik";

import { Box, Button, Container, Grid, Typography } from "@mui/material";

import * as React from "react";
import { useState, useEffect } from "react";

// MUI Components
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

// MUI Icons
import AccountCircle from "@mui/icons-material/AccountCircle";
import CallIcon from "@mui/icons-material/Call";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import DomainVerificationIcon from "@mui/icons-material/DomainVerification";

import { useCart } from "../contexts/cart";
import { useUser } from "../contexts/user";
import { useApi } from "../contexts/api";

const columns = [
  { id: "product", label: "Name", minWidth: 170 },
  { id: "category", label: "Category", minWidth: 40 },
  { id: "variant", label: "Variant", minWidth: 80 },
  {
    id: "price",
    label: "Price",
    minWidth: 100,
    format: (value) => `₱ ${value}`,
  },
  {
    id: "quantity",
    label: "Quantity",
    minWidth: 20,
    align: "right",
  },
  {
    id: "total_price",
    label: "Total Price",
    minWidth: 80,
    align: "right",
    format: (value) => `₱ ${value}`,
  },
];

function createData({ product_id, variant_id, quantity }) {
  const result = {
    product: product_id.name,
    category: product_id.category_id.name,
    variant: variant_id.name,
    price: product_id.price * variant_id.price_multiplier,
    quantity,
    total_price: product_id.price * quantity * variant_id.price_multiplier,
  };

  return result;
}

function CartItems() {
  const { cartList } = useCart();

  return (
    <Paper
      sx={{
        m: {
          xs: "0 -50px",
          sm: "0 0",
          md: "20px 40px",
        },
      }}
      elevation={2}
    >
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                colSpan={3}
                // sx={{ backgroundColor: "#000" }}
              >
                Product
              </TableCell>
              <TableCell align="center" colSpan={3}>
                Details
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {cartList && (
            <TableBody>
              {cartList.map((cart, i) => {
                let formatted_cart = createData(cart);
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={cart.id}
                  >
                    {columns.map((column) => {
                      const value = formatted_cart[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </Paper>
  );
}

function TextForm({ id, label, icon, handleChange, value }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        m: "10px 0",
        width: "100%",
      }}
    >
      {icon}
      <TextField
        id={id}
        label={label}
        variant="standard"
        sx={{ width: "60%" }}
        onChange={handleChange}
        value={value}
      />
    </Box>
  );
}

function Checkout() {
  const { apiCheckoutItems } = useApi();

  const [paymentType, setPaymentType] = useState("cod");
  const {
    cartList,
    cartListData,
    totalPriceCart,
    totalQuantityCart,
    checkOutItems,
  } = useCart();
  const { user } = useUser();

  const handlePaymentType = (e, value) => {
    setPaymentType(value);
    formik.setFieldValue("payment_option", value);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      contact_number: "",
      address: "",
      payment_option: "cod",
      total_price: totalPriceCart,
      shipping_fee: 50,
      total_quantity: totalQuantityCart,
      credit_card_number: "",
      credit_card_expiry: "",
      credit_card_cvv: "",
      gcash_name: "",
      gcash_number: "",
      checkout_items: cartListData,
    },
    onSubmit: (values) => {
      apiCheckoutItems(values.checkout_items);
      checkOutItems(user.id, values);
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container sx={{ padding: "8vh", minHeight: "80vh" }}>
      <Box pb="20px">
        <Typography variant="h2" fontWeight="bold">
          Cart Items
        </Typography>
        <CartItems />
      </Box>

      {/* Form */}
      <Box component="form" onSubmit={formik.handleSubmit}>
        <Typography variant="h2" fontWeight="bold">
          Checkout Details
        </Typography>

        <Grid container>
          {/* Payment Details Table */}
          <Grid item xs={12} sm={12} md={6}>
            <Typography variant="h5">Payment Details</Typography>
            <Paper
              sx={{
                m: {
                  xs: "0 -50px",
                  sm: "0 ",
                  md: "20px 10px",
                },
              }}
              elevation={2}
            >
              <TableContainer sx={{ minHeight: "200" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Total Merchandise Price</TableCell>
                      <TableCell>Shipping Fee</TableCell>
                      <TableCell>Total Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartList && (
                      <TableRow>
                        <TableCell>₱ {totalPriceCart}</TableCell>
                        <TableCell>₱ 50</TableCell>
                        <TableCell>₱ {totalPriceCart + 50}</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
          {/* Information */}
          <Grid item xs={12} sm={12} md={6}>
            <Typography variant="h5" sx={{ pt: "10px" }}>
              Contact
            </Typography>

            <TextForm
              id="name"
              label="Name"
              handleChange={formik.handleChange}
              value={formik.values.name}
              icon={
                <AccountCircle
                  sx={{ color: "action.active", mr: 1 }}
                  fontSize="large"
                />
              }
            />

            <TextForm
              id="contact_number"
              label="Contact Number"
              handleChange={formik.handleChange}
              value={formik.values.contact_number}
              icon={
                <CallIcon
                  sx={{ color: "action.active", mr: 1 }}
                  fontSize="large"
                />
              }
            />

            <Typography variant="h5">Address</Typography>
            <TextForm
              id="address"
              label="Address"
              handleChange={formik.handleChange}
              value={formik.values.address}
              icon={
                <LocationOnIcon
                  sx={{ color: "action.active", mr: 1 }}
                  fontSize="large"
                />
              }
            />

            <Typography variant="h5">Payment Options</Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                m: "10px 0",
              }}
            >
              <ToggleButtonGroup
                id="payment_option"
                value={formik.values.payment_option}
                exclusive
                onChange={handlePaymentType}
              >
                <ToggleButton value="cod" id="cod">
                  <Typography id="cod">COD</Typography>
                </ToggleButton>
                <ToggleButton value="cc" id="cc">
                  <Typography id="cc">Card Credit</Typography>
                </ToggleButton>
                <ToggleButton value="gcash" id="gcash">
                  <Typography id="gcash">Gcash</Typography>
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            {paymentType === "cc" && (
              <Box>
                <Typography variant="h6">Card Details</Typography>
                <TextForm
                  id="credit_card_number"
                  label="Card Number"
                  handleChange={formik.handleChange}
                  value={formik.values.credit_card_number}
                  icon={
                    <CreditCardIcon
                      sx={{ color: "action.active", mr: 1 }}
                      fontSize="large"
                    />
                  }
                />
                <TextForm
                  id="credit_card_expiry"
                  label="Expiry Date(MM/YY)"
                  handleChange={formik.handleChange}
                  value={formik.values.credit_card_expiry}
                  icon={
                    <InsertInvitationIcon
                      sx={{ color: "action.active", mr: 1 }}
                      fontSize="large"
                    />
                  }
                />
                <TextForm
                  id="credit_card_cvv"
                  label="CVV"
                  handleChange={formik.handleChange}
                  value={formik.values.credit_card_cvv}
                  icon={
                    <DomainVerificationIcon
                      sx={{ color: "action.active", mr: 1 }}
                      fontSize="large"
                    />
                  }
                />
              </Box>
            )}

            {paymentType === "gcash" && (
              <Box>
                <Typography variant="h6">Gcash Details</Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-end",
                    m: "10px 0",
                    width: "100%",
                  }}
                >
                  <AccountCircle
                    sx={{ color: "action.active", mr: 1 }}
                    fontSize="large"
                  />
                  <TextField
                    id="gcash_name"
                    label="Gcash Name"
                    variant="standard"
                    sx={{ width: "60%" }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-end",
                    m: "10px 0",
                    width: "100%",
                  }}
                >
                  <CallIcon
                    sx={{ color: "action.active", mr: 1 }}
                    fontSize="large"
                  />
                  <TextField
                    id="gcash_number"
                    label="Gcash Number"
                    variant="standard"
                    sx={{ width: "60%" }}
                  />
                </Box>
              </Box>
            )}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
                mt: "30px",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                sx={{ color: "#fff" }}
                type="submit"
              >
                Proceed to checkout
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Checkout;

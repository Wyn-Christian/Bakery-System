import axios from "axios";

import {
  Box,
  Button,
  Container,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSnackbar } from "notistack";

import { useCart } from "../contexts/cart";
import { useUser } from "../contexts/user";
import { useApi } from "../contexts/api";

function Product() {
  const { apiStocks } = useApi();

  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const { addToCart } = useCart();
  const { user } = useUser();

  const [product, setProduct] = useState(undefined);
  const [selectedVariant, setSelectedVariant] = useState("");

  const handleAddToCart = () => {
    if (!user) {
      enqueueSnackbar("Please Log in first");
    } else if (!selectedVariant) {
      enqueueSnackbar("Please choose variant first!");
    } else {
      let cart_item = {
        product_id: id,
        user_id: user.id,
        variant_id: selectedVariant,
      };
      addToCart(cart_item);
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5001/catalog/products/${id}`)
      .then((result) => setProduct(result.data.product));
  }, [id]);
  return (
    <Container>
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          pt: "10vh",
        }}
      >
        <Typography variant="h2" sx={{ pb: "20px" }}>
          {product ? product.name : <Skeleton width={400} />}
        </Typography>
        <Grid container width="100%">
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            sx={{
              display: "flex",
              justifyContent: {
                xs: "center",
                sm: "end",
              },
              padding: "10px 20px",
              width: {
                xs: "100%",
                sm: "41%",
                md: "16.67%",
              },
            }}
          >
            {product ? (
              <img
                src={`http://localhost:3000/assets/product-img/${product.category_id.name}/${product.img_name}`}
                alt="product"
                style={{
                  width: "80%",
                  height: "auto",
                }}
              />
            ) : (
              <Skeleton width="80%" height={400} />
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={6} sx={{ p: "20px" }}>
            <Typography variant="h4">Description</Typography>
            <Typography variant="body1" sx={{ pb: "20px" }}>
              {product ? product.description : <Skeleton />}
            </Typography>
            <Typography variant="h5">
              Price:{" "}
              {product ? (
                product.price
              ) : (
                <Skeleton width={90} sx={{ display: "inline-block" }} />
              )}
            </Typography>
            <Typography variant="h5">
              Stock:{" "}
              {!!apiStocks.length &&
                apiStocks.find((p) => p.id === id).stocks}
            </Typography>
            <FormControl
              variant="standard"
              sx={{
                m: 1,
                minWidth: 120,
                width: "50%",
                textAlign: "center",
              }}
            >
              <InputLabel>Select Variant</InputLabel>
              <Select
                id="variant"
                label="Variant"
                value={selectedVariant}
                onChange={(e) => setSelectedVariant(e.target.value)}
              >
                <MenuItem value="" disabled>
                  Select Variants
                </MenuItem>

                {product ? (
                  product.variant_set_id.variants_id.map((v, i) => (
                    <MenuItem key={v.id} value={v.id}>
                      {v.name}
                    </MenuItem>
                  ))
                ) : (
                  <Skeleton height={40} />
                )}
              </Select>
              <Button
                sx={{ mt: "20px", color: "#fff", fontWeight: "bold" }}
                variant="contained"
                onClick={handleAddToCart}
              >
                Add to cart
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Product;

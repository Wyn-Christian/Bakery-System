import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Button, CardActions, Skeleton } from "@mui/material";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useTheme } from "@mui/material";
import { useNavigate } from "react-router";

import { useSnackbar } from "notistack";

import { useUser } from "../contexts/user";
import { useCart } from "../contexts/cart";
import { useApi } from "../contexts/api";
import { usePorts } from "../contexts/ports";

export default function CardProduct({
  id,
  category_id,
  img_name,
  name,
  price,
  variant_set_id,
}) {
  const { apiStocks } = useApi();
  const ports = usePorts();

  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = useUser();
  const { enqueueSnackbar } = useSnackbar();
  const { addToCart } = useCart();

  const [selectedVariant, setVariant] = useState("");

  const handleChange = (event) => {
    setVariant(event.target.value);
  };

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

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          maxWidth: 400,
          margin: "auto",
          borderRadius: "20px",
          backgroundColor: theme.palette.primary.light,
        }}
        elevation={3}
      >
        {category_id ? (
          <CardMedia
            sx={{
              borderRadius: "10%",
              padding: "20px 20px 20px 20px",
            }}
            component="img"
            image={`http://localhost:${ports.PORT}/assets/product-img/${category_id.name}/${img_name}`}
            alt="green iguana"
          />
        ) : (
          <Skeleton
            variant="rectangular"
            height="300px"
            sx={{
              display: "flex",
              borderRadius: "10%",
              margin: "20px 20px 10px 20px",
            }}
          />
        )}

        <CardContent sx={{ textAlign: "center", pt: 0 }}>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="h6">Price: {price}</Typography>
          <Typography variant="h6">
            Stock:{" "}
            {!!apiStocks.length &&
              apiStocks.find((p) => p.id === id).stocks}
          </Typography>

          <FormControl
            variant="standard"
            sx={{
              m: 1,
              minWidth: 120,
              width: "100%",
              textAlign: "center",
            }}
          >
            <InputLabel>Select Variant</InputLabel>
            <Select
              value={selectedVariant}
              onChange={handleChange}
              label="Variant"
            >
              <MenuItem value="" disabled>
                Select Variants
              </MenuItem>
              {variant_set_id.variants_id.map((v) => (
                <MenuItem key={v.id} value={v.id}>
                  {v.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </CardContent>

        <CardActions
          sx={{
            justifyContent: "center",
            gap: "5%",
            padding: "0 0 20px 0",
          }}
        >
          <Button
            variant="contained"
            onClick={() => navigate(`/product/${id}`)}
          >
            See More
          </Button>
          <Button variant="contained" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

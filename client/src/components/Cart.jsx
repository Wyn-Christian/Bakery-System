import { useNavigate } from "react-router-dom";

// MUI Components
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";

// MUI icons
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

// useContexts
import { useCart } from "../contexts/cart";
import { TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import { useUser } from "../contexts/user";

const CartItem = ({ id, product_id, variant_id, quantity }) => {
  const { removeToCart, updateCartQuantity } = useCart();
  const handleQuantityChange = (event) => {
    if (event.target.value < 1) {
      event.target.value = 1;
    }
    updateCartQuantity(id, event.target.value);
  };
  return (
    <>
      <ListItem
        sx={{
          justifyContent: "space-around",
          alignItems: "flex-start",
        }}
      >
        <Box>
          {product_id && (
            <img
              src={`http://localhost:3000/assets/product-img/${product_id.category_id.name}/${product_id.img_name}`}
              alt="carrot"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "100%",
              }}
            />
          )}
        </Box>
        <Box display="flex" flexDirection="column" width="60%">
          <Typography fontWeight="bold">{product_id.name}</Typography>
          <Typography fontWeight="bold">
            {product_id.category_id.name}
          </Typography>
          <Divider />
          <Box display="flex" gap="2px">
            <Box textAlign="end" width={200}>
              <Typography>variant:</Typography>
              <Typography>price:</Typography>
              <Typography sx={{ pt: "3px" }}>quantity:</Typography>
              <Typography>total price:</Typography>
            </Box>
            <Box>
              <Typography>{variant_id.name}</Typography>
              <Typography>
                {product_id.price * variant_id.price_multiplier}
              </Typography>
              <TextField
                id="quantity"
                defaultValue={quantity}
                onChange={handleQuantityChange}
                type="number"
                sx={{
                  "& .MuiInputBase-input": {
                    p: "2.5px 10px",
                  },
                }}
              />
              <Typography>
                {product_id.price * variant_id.price_multiplier * quantity}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box>
          <IconButton onClick={() => removeToCart(id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </ListItem>
      <Divider />
    </>
  );
};

function Cart() {
  const navigate = useNavigate();
  const { user } = useUser();

  const { cartList, cartOpen, setCartOpen } = useCart();
  const theme = useTheme();

  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setCartOpen(false);
  };

  return (
    <Drawer anchor="right" open={cartOpen} onClose={toggleDrawer}>
      <Box sx={{ width: 300 }}>
        <List>
          <ListItem disablePadding sx={{ p: "0 0 10px 0" }}>
            <Button onClick={() => setCartOpen(false)}>
              <CloseIcon />
            </Button>
            <Typography
              variant="h5"
              marginLeft="16px"
              fontWeight="bold"
              color={theme.palette.primary.main}
            >
              YOUR CART
            </Typography>
          </ListItem>
          <Divider />

          {/* Cart Items */}
          {cartList.map((cart) => (
            <CartItem {...cart} key={cart.id} />
          ))}

          {/* Summary */}
          {!!cartList.length && (
            <ListItem>
              <Box
                display="flex"
                flexDirection="column"
                width="100%"
                gap="10px"
              >
                <Typography textAlign="end">Total Price:</Typography>
                <Typography textAlign="end">Total Quantity:</Typography>
              </Box>

              <Box
                display="flex"
                flexDirection="column"
                width="100%"
                gap="10px"
              >
                <Typography marginLeft="10px">
                  &#8369;{" "}
                  {cartList.reduce(
                    (total, cart) =>
                      total +
                      cart.product_id.price *
                        cart.variant_id.price_multiplier *
                        cart.quantity,
                    0
                  )}
                </Typography>
                <Typography marginLeft="10px">
                  {cartList.reduce(
                    (total, cart) => total + cart.quantity,
                    0
                  )}{" "}
                  pieces
                </Typography>
              </Box>
            </ListItem>
          )}

          {/* Buy all now button letsgooo */}
          {!!cartList.length && (
            <ListItem sx={{ justifyContent: "center" }}>
              <Button
                variant="contained"
                sx={{ width: "80%", alignSelf: "center" }}
                onClick={() => {
                  navigate("/checkout");
                  setCartOpen(false);
                }}
              >
                <Typography
                  fontWeight="bold"
                  color="#f2f2f2"
                  padding="10px 0"
                >
                  Buy All Now
                </Typography>
              </Button>
            </ListItem>
          )}

          {!cartList.length && (
            <Typography textAlign="center" fontWeight="bold">
              Try adding new items!
            </Typography>
          )}
        </List>
      </Box>
    </Drawer>
  );
}

export default Cart;

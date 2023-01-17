import { Link } from "react-router-dom";
import { useState } from "react";

import Cart from "./Cart";

// MUI components
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

// MUI Material Icons
import Person2Icon from "@mui/icons-material/Person2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";

// useContexts
import { useCart } from "../contexts/cart";
import { useUser } from "../contexts/user";
import { Badge } from "@mui/material";

const Items = ({ title, to }) => (
  <Button sx={{ color: "#fff" }}>
    <ListItem disablePadding>
      <Link
        to={to}
        style={{
          textDecoration: "none",
          color: "#fff",
        }}
      >
        <ListItemText
          primary={title}
          sx={{
            "& .MuiTypography-root": {
              fontSize: "13px",
            },
          }}
        />
      </Link>
    </ListItem>
  </Button>
);

const MobileItems = ({ title, to }) => (
  <Link
    to={to}
    style={{
      textDecoration: "none",
      color: "#000",
    }}
  >
    <ListItem disablePadding>
      <ListItemButton sx={{ textAlign: "center", textDecoration: "none" }}>
        <ListItemText primary={title} />
      </ListItemButton>
    </ListItem>
  </Link>
);

function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartList, setCartOpen } = useCart();
  const { user } = useUser();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box>
        <img
          style={{ height: "48px", margin: "20px 0" }}
          src="http://localhost:3000/http://localhost:3000/assets/images/logo.png"
          alt="logo"
        />
      </Box>
      <Divider />

      <List>
        <MobileItems title="All Products" to="/all-products" />

        <MobileItems title="Categories" to="/categories" />
        <Divider />

        {user && <MobileItems title="Account" to="/account" />}
        {user && <MobileItems title="Logout" to="/logout" />}
        {!user && <MobileItems title="Login" to="/login" />}
        {!user && <MobileItems title="Register" to="/register" />}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" }, color: "#fff" }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "none", md: "block" },
            }}
          >
            {user && <Items title="Account" to="/account" />}
            {user && <Items title="Logout" to="/logout" />}
            {!user && <Items title="Login" to="/login" />}

            {!user && <Items title="Register" to="/register" />}
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "block", sm: "block", md: "none" },
            }}
          ></Box>
          <Box
            sx={{
              flexGrow: 1,
            }}
          >
            <img
              style={{ height: "48px", position: "relative" }}
              src="http://localhost:3000/assets/images/logo.png"
              alt="logo"
            />
          </Box>

          <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
            <Items title="All Products" to="/all-products" />
            <Items title="Categories" to="/categories" />
          </Box>
          {user && (
            <Tooltip title="Your shopping cart" arrow>
              <IconButton
                sx={{ color: "#fff", borderRadius: "0", padding: "20px 15px" }}
                size="large"
                onClick={() => setCartOpen(true)}
              >
                <ListItem disablePadding>
                  <Badge badgeContent={cartList.length} color="secondary">
                    <ShoppingCartIcon />
                  </Badge>
                </ListItem>
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
      </AppBar>

      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            sm: "block",
            md: "none",
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Cart />
    </Box>
  );
}

export default NavBar;

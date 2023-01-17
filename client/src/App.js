import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import theme from "./contexts/theme";

// Global Components
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts";
import Categories from "./pages/Categories";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";
import Logout from "./pages/Logout";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;

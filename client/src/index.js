import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";

// Contexts
import { CartProvider } from "./contexts/cart";
import { UserProvider } from "./contexts/user";
import { DataProvider } from "./contexts/data";
import { SnackbarProvider } from "notistack";
import { ApiProvider } from "./contexts/api";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SnackbarProvider
        maxSnack={6}
        autoHideDuration={1500}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <DataProvider>
          <ApiProvider>
            <CartProvider>
              <UserProvider>
                <App />
              </UserProvider>
            </CartProvider>
          </ApiProvider>
        </DataProvider>
      </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>
);

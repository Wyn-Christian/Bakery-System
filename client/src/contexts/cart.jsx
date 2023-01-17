import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useNavigate } from "react-router";

import axios from "axios";
import { useSnackbar } from "notistack";

export const useCartSource = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [cartList, setCartList] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const totalPriceCart = useMemo(
    () =>
      cartList.reduce(
        (total, cart) =>
          total +
          cart.product_id.price *
            cart.quantity *
            cart.variant_id.price_multiplier,
        0
      ),
    [cartList]
  );

  const cartListData = useMemo(
    () =>
      cartList.map((cart) => ({
        ...cart,
        total_price:
          cart.product_id.price *
          cart.quantity *
          cart.variant_id.price_multiplier,
      })),
    [cartList]
  );

  const totalQuantityCart = useMemo(
    () => cartList.reduce((total, cart) => total + cart.quantity, 0),
    [cartList]
  );

  const initiateCartList = useCallback((user_id) => {
    axios
      .get(`http://localhost:5001/catalog/cart-items/user/${user_id}`)
      .then((result) => {
        setCartList(result.data.cart_items);
      });
    // axios.
  }, []);

  const addToCart = useCallback(
    ({ user_id, product_id, variant_id }) => {
      let cart = cartList.find(
        (cart) =>
          cart.product_id.id === product_id &&
          cart.variant_id.id === variant_id
      );
      if (!cart) {
        enqueueSnackbar("Added to cart!", { variant: "success" });
        axios
          .post("http://localhost:5001/catalog/cart-items/create", {
            user_id,
            product_id,
            variant_id,
          })
          .then((result) => {
            setCartList((cartList) => {
              return [...cartList, { ...result.data.new_cart_item }];
            });
          });
      } else {
        enqueueSnackbar("Already added to cart!", {
          variant: "warning",
          preventDuplicate: true,
        });
      }
    },
    [cartList, enqueueSnackbar]
  );

  const removeToCart = useCallback(
    (id) => {
      axios
        .post(`http://localhost:5001/catalog/cart-items/${id}/delete`)
        .then((result) => {
          if (result.data.status === "Success") {
            enqueueSnackbar(
              "Item is successfully removed from the cart!",
              {
                variant: "success",
              }
            );
            let filteredCart = cartList.filter((cart) => cart.id !== id);
            setCartList(filteredCart);
          }
        });
    },
    [enqueueSnackbar, cartList]
  );

  const checkOutItems = (user_id, data) => {
    axios
      .post(
        `http://localhost:5001/catalog/checkout/${user_id}/create`,
        data
      )
      .then((result) => {
        setCartList([]);
        enqueueSnackbar(
          "Checked Out Successfully! Thank you for purchasing to our store!",
          { variant: "success", autoHideDuration: 5000 }
        );
        navigate("/");
        console.log(result.data);
      });
  };

  const updateCartQuantity = (id, quantity) => {
    axios
      .post(
        `http://localhost:5001/catalog/cart-items/${id}/update-quantity`,
        { quantity }
      )
      .then((result) => {
        setCartList((cartList) => {
          let new_data = cartList.map((item) =>
            item.id === result.data.id ? result.data : item
          );
          console.log(new_data);
          return [...new_data];
        });
      });
  };

  return {
    cartList,
    setCartList,
    cartOpen,
    setCartOpen,
    initiateCartList,
    totalPriceCart,
    totalQuantityCart,
    addToCart,
    removeToCart,
    cartListData,
    checkOutItems,
    updateCartQuantity,
  };
};

export const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  return (
    <CartContext.Provider value={useCartSource()}>
      {children}
    </CartContext.Provider>
  );
};

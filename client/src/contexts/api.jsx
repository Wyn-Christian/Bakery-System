import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";

import axios from "axios";
import { useSnackbar } from "notistack";

export const useApiSource = () => {
  const [apiKey, setApiKey] = useState("63c696b530257e3cc3447a2c");

  const [apiStocks, setApiStocks] = useState([]);

  // get stocks
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/${apiKey}/stocks`)
      .then((result) => setApiStocks(result.data));
  }, [apiKey]);

  // checkoutItems
  const apiCheckoutItems = (checkout_items) => {
    let updated_stocks = apiStocks.map((product) => {
      let total_quantity = checkout_items
        .filter((item) => item.product_id.id === product.id)
        .reduce((total, item) => total + item.quantity, 0);
      return { ...product, stocks: product.stocks - total_quantity };
    });
    console.log({ apiStocks, updated_stocks });
    setApiStocks(updated_stocks);
    axios
      .post(`http://localhost:5000/api/${apiKey}/add-checkout-items`, {
        checkout_items,
        updated_stocks,
      })
      .then((result) => console.log(result.data));
  };
  return { apiKey, apiStocks, apiCheckoutItems };
};

export const ApiContext = createContext();
export const useApi = () => useContext(ApiContext);

export const ApiProvider = ({ children }) => {
  return (
    <ApiContext.Provider value={useApiSource()}>
      {children}
    </ApiContext.Provider>
  );
};

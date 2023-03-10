import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

import { usePorts } from "../contexts/ports";

export const useDataSource = () => {
  const ports = usePorts();
  const [products, setProducts] = useState([]);
  const [variants, setVariants] = useState([]);
  const [variantSets, setVariantSets] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:${ports.SERVER_PORT}/catalog/products`)
      .then((result) => setProducts(result.data.list_products));

    axios
      .get(`http://localhost:${ports.SERVER_PORT}/catalog/variants`)
      .then((result) => setVariants(result.data.list_variants));

    axios
      .get(`http://localhost:${ports.SERVER_PORT}/catalog/variant-sets`)
      .then((result) => setVariantSets(result.data.list_variant_sets));
    axios
      .get(`http://localhost:${ports.SERVER_PORT}/catalog/categories`)
      .then((result) => setCategories(result.data.list_categories));
  }, []);

  return {
    products,
    setProducts,
    variants,
    setVariants,
    variantSets,
    setVariantSets,
    categories,
    setCategories,
  };
};

export const DataContext = createContext({});
export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  return (
    <DataContext.Provider value={useDataSource()}>
      {children}
    </DataContext.Provider>
  );
};

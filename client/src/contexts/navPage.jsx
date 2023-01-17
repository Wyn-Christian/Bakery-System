import { useState, useContext, createContext } from "react";

function useNavPageSource() {
  const [navPage, setNavPage] = useState("login");

  return {
    navPage,
    setNavPage,
  };
}

const NavPageContext = createContext();
export const useNavPage = () => useContext(NavPageContext);

export function NavPageProvider({ children }) {
  return (
    <NavPageContext.Provider value={useNavPageSource()}>
      {children}
    </NavPageContext.Provider>
  );
}

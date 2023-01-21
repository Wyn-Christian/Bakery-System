import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";

export const PortsContext = createContext();
export const usePorts = () => useContext(PortsContext);

export const PortsProvider = ({ children }) => {
  const ports = {
    PORT: 4000,
    SERVER_PORT: 4001,
    API_PORT: 5001,
    API_KEY: "63c696b530257e3cc3447a2c",
  };
  return (
    <PortsContext.Provider value={ports}>{children}</PortsContext.Provider>
  );
};

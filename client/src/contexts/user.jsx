import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./cart";
import axios from "axios";
import { useSnackbar } from "notistack";

// User Custom Hooks
export const useUserSource = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { initiateCartList } = useCart();
  const [user, setUser] = useState(undefined);

  const loginUser = ({ email, password }) => {
    axios
      .post("http://localhost:5001/users/login", { email, password })
      .then((result) => {
        if (result.data.user === null) {
          enqueueSnackbar("User doesn't exist!", {
            variant: "error",
          });
        }
        if (result.data.user !== null) {
          setUser(result.data.user);
          initiateCartList(result.data.user.id);
          navigate("/");
          enqueueSnackbar("Login Successfully!", {
            variant: "success",
          });
        }
        return result;
      });
  };

  const logoutUser = () => {
    setUser(undefined);
    enqueueSnackbar("Logout Successfully!", {
      variant: "success",
      preventDuplicate: true,
    });
    navigate("/login");
  };

  return { user, setUser, loginUser, logoutUser };
};

export const UserContext = createContext({});
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  return (
    <UserContext.Provider value={useUserSource()}>
      {children}
    </UserContext.Provider>
  );
};

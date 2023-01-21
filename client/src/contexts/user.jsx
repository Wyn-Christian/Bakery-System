import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./cart";
import axios from "axios";
import { useSnackbar } from "notistack";
import { usePorts } from "../contexts/ports";

const PORT = "5001";
const baseURL = "http://localhost:" + PORT;

// User Custom Hooks
export const useUserSource = () => {
  const ports = usePorts();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { initiateCartList } = useCart();
  const [user, setUser] = useState(undefined);

  const loginUser = ({ email, password }) => {
    axios
      .post(`http://localhost:${ports.SERVER_PORT}/users/login`, {
        email,
        password,
      })
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

  const registerUser = (data) => {
    axios
      .post(`http://localhost:${ports.SERVER_PORT}/users/create`, data)
      .then((result) => {
        if (result.data.new_user === null) {
          enqueueSnackbar("Registration failed! please try again...", {
            variant: "error",
          });
        }
        if (result.data.new_user !== null) {
          navigate("/login");
          enqueueSnackbar("Register Successfully!", {
            variant: "success",
          });
        }
        return result;
      });
  };

  const checkUserExist = async (email) => {
    let result = await axios
      .post(`http://localhost:${ports.SERVER_PORT}/users/check-user`, {
        email,
      })
      .then((result) => result.data.user);
    return result !== null ? true : false;
  };

  const logoutUser = () => {
    setUser(undefined);
    enqueueSnackbar("Logout Successfully!", {
      variant: "success",
      preventDuplicate: true,
    });
    navigate("/login");
  };

  return {
    user,
    setUser,
    loginUser,
    logoutUser,
    registerUser,
    checkUserExist,
  };
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

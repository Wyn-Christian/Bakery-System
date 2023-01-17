import { useEffect } from "react";
import { useUser } from "../contexts/user";

function Logout() {
  const { logoutUser } = useUser();
  useEffect(() => {
    logoutUser();
  }, []);
  return <>logoutpageg</>;
}

export default Logout;

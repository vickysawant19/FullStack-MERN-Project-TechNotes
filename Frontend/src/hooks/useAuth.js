import { useSelector } from "react-redux";
import { selectToken } from "../features/auth/authSlice";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectToken);
  let isManager = false;
  let isAdmin = false;
  let status = "Employee";

  if (token) {
    const decode = jwtDecode(token.accessToken);
    const { username, roles, userid } = decode.UserInfo;

    isManager = roles.includes("manager");
    isAdmin = roles.includes("admin");

    if (isManager) status = "anager";
    if (isAdmin) status = "Admin";

    return { username, roles, status, isManager, isAdmin, userid };
  }
  return { username: "", roles: [], isManager, isAdmin, status, userid: "" };
};

export default useAuth;

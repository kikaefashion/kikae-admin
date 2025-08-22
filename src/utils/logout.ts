import Cookies from "universal-cookie";

export const logout = () => {
  const cookies = new Cookies();
  cookies.remove("authToken");
};

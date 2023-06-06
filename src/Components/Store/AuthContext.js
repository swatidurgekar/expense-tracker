import { createContext, useState } from "react";

export const AuthContext = createContext({
  islogin: "",
  isLoggedIn: "",
  idToken: "",
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const token = localStorage.getItem("idToken");
  const [islogin, setIsLogin] = useState();
  const [idToken, setIdToken] = useState(token);

  const login = () => {
    setIsLogin(true);
  };

  const logoutHandler = () => {
    setIsLogin(false);
    setIdToken("");
  };

  const authContext = {
    islogin: !!idToken,
    isLoggedIn: login,
    idToken: idToken,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

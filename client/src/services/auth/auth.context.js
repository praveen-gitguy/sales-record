import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authService } from "./auth.service";
import { toast } from "react-toastify";

const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [authState, setAuthState] = useState({
    loading: false,
    error: null,
    user: null,
    profileFetchRequestCompleted: false,
  });

  let from = location.state?.from?.pathname || "/";

  const authHandlerHelper = async (fn, value) => {
    setAuthState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const { data } = await fn(value);
      localStorage.setItem("auth-token", data.body.token);
      setAuthState((prev) => ({ ...prev, user: data.body.user }));
      navigate(from, { replace: true });
    } catch (error) {
      if (error.response && error.response.data) {
        toast(error.response.data.message, { type: "error" });
        setAuthState((prev) => ({
          ...prev,
          error: error.response.data.message,
        }));
        return;
      }
      toast("Some error occured", { type: "error" });
      setAuthState((prev) => ({ ...prev, error: "Some error occured" }));
    }

    setAuthState((prev) => ({
      ...prev,
      loading: false,
    }));
  };

  const signup = (value) => {
    authHandlerHelper(authService.signup, value);
  };

  const signin = (value) => {
    authHandlerHelper(authService.signin, value);
  };

  const signout = () => {
    authService.signout();
    localStorage.removeItem("auth-token");
    setAuthState((prev) => ({
      ...prev,
      user: null,
      loading: false,
      error: false,
    }));
    navigate("/auth/signin");
  };

  const profile = async () => {
    setAuthState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const { data } = await authService.profile();
      setAuthState((prev) => ({ ...prev, user: data.body.user }));
    } catch (error) {
      if (error.response && error.response.data) {
        setAuthState((prev) => ({ ...prev, error: error.response.data }));
        return;
      }
      setAuthState((prev) => ({ ...prev, error: "Some error occured" }));
    } finally {
      setAuthState((prev) => ({
        ...prev,
        loading: false,
        profileFetchRequestCompleted: true,
      }));
    }
  };

  useEffect(() => {
    profile();
  }, []);

  return (
    <AuthContext.Provider value={{ authState, signin, signup, signout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);

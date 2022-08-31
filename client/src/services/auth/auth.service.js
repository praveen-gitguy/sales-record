import {
  axiosInstance,
  axiosInstanceWithAuth,
} from "../../config/axios.config";

export const authService = {
  signup: (data) => {
    return axiosInstance.post("/api/auth/signup", data);
  },

  signin: (data) => {
    return axiosInstance.post("/api/auth/signin", data);
  },

  signout: () => {
    return axiosInstance.get("/api/auth/signout");
  },

  profile: () => {
    return axiosInstanceWithAuth.get("/api/auth/profile");
  },
};

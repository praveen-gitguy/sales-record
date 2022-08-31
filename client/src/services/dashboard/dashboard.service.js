import { axiosInstanceWithAuth } from "../../config/axios.config";

export const dashboardServices = {
  fetchTopFiveSellingProducts: () => {
    return axiosInstanceWithAuth.get("/api/sales/top-five");
  },
  fetchRevenueOfTheDay: () => {
    return axiosInstanceWithAuth.get("/api/sales/revenue-of-the-day");
  },
  createSale: (value) => {
    return axiosInstanceWithAuth.post("/api/sales", value);
  },
};

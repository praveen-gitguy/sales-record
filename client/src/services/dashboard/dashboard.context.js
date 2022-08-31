import React, { createContext, useCallback, useContext, useState } from "react";
import { toast } from "react-toastify";
import { dashboardServices } from "./dashboard.service";

const DashboardContext = createContext();

export default function DashboardContextProvider({ children }) {
  const [productsState, setProductsState] = useState({
    loading: true,
    error: false,
    products: [],
  });
  const [revenueState, setRevenueState] = useState({
    loading: true,
    error: false,
    revenueOfTheDay: {},
  });
  const [sale, setSale] = useState({ loading: false });

  const getTopFiveSellingProducts = useCallback(async () => {
    setProductsState((prev) => ({
      ...prev,
      loading: true,
      error: false,
      products: [],
    }));
    try {
      const { data } = await dashboardServices.fetchTopFiveSellingProducts();
      setProductsState((prev) => ({
        ...prev,
        products: data?.body?.sales ?? [],
      }));
    } catch (error) {
      setProductsState((prev) => ({ ...prev, error: true }));
    } finally {
      setProductsState((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  const getRevenueOfTheDay = useCallback(async () => {
    setRevenueState((prev) => ({
      ...prev,
      loading: true,
      error: false,
      revenueOfTheDay: {},
    }));
    try {
      const { data } = await dashboardServices.fetchRevenueOfTheDay();

      setRevenueState((prev) => ({
        ...prev,
        revenueOfTheDay: data?.body ?? {},
      }));
    } catch (error) {
      setRevenueState((prev) => ({ ...prev, error: true }));
    } finally {
      setRevenueState((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  const createSale = async (value) => {
    setSale({ loading: true });
    try {
      await dashboardServices.createSale(value);
      toast("Sale create", {
        type: "success",
      });
    } catch (error) {
      if (error.response && error.response.data) {
        toast(error.response.data.message, {
          type: "error",
        });
        return;
      }
      toast("Failed to create sale", {
        type: "error",
      });
    } finally {
      setSale({ loading: false });
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        productsState,
        revenueState,
        getTopFiveSellingProducts,
        getRevenueOfTheDay,
        createSale,
        sale,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboardContext = () => useContext(DashboardContext);

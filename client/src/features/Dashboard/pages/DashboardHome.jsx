import React, { useEffect } from "react";
import { useDashboardContext } from "../../../services/dashboard/dashboard.context";
import RevenueOfTheDay from "../components/RevenueOfTheDay";
import TopFiveProducts from "../components/TopFiveProducts";

export default function DashboardHome() {
  const { getTopFiveSellingProducts, getRevenueOfTheDay } =
    useDashboardContext();

  useEffect(() => {
    getTopFiveSellingProducts();
    getRevenueOfTheDay();
  }, [getTopFiveSellingProducts, getRevenueOfTheDay]);

  return (
    <div>
      <h1 className="text-center">Dashboard</h1>

      <div className="row mt-5">
        <div className="col-12 col-md-8">
          <TopFiveProducts />
        </div>
        <div className="col-12 col-md-4">
          <RevenueOfTheDay />
        </div>
      </div>
    </div>
  );
}

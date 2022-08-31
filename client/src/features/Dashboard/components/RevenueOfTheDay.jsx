import React from "react";
import Loader from "../../../components/Loader";
import { useDashboardContext } from "../../../services/dashboard/dashboard.context";

export default function RevenueOfTheDay() {
  const { revenueState } = useDashboardContext();
  const { loading, error, revenueOfTheDay } = revenueState;

  return (
    <div>
      <div className="shadow p-5">
        <h2 className="text-center mb-5">Total revenue today</h2>
        {loading && <Loader />}
        {error && (
          <div className="alert alert-danger">Failed to load products</div>
        )}

        {!loading && !error ? (
          <div className="card">
            <div className="card-body">
              {revenueOfTheDay.currency ?? "INR"} {revenueOfTheDay.revenue ?? 0}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

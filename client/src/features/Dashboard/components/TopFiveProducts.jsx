import React from "react";
import { Bar, BarChart, Legend, XAxis, YAxis } from "recharts";
import Loader from "../../../components/Loader";
import { useDashboardContext } from "../../../services/dashboard/dashboard.context";

export default function TopFiveProducts() {
  const { productsState } = useDashboardContext();
  const { loading, error, products } = productsState;

  return (
    <div>
      <div className="row shadow p-5">
        <h2 className="text-center mb-5">Top 5 selling products</h2>

        {loading && <Loader />}
        {error && (
          <div className="alert alert-danger">Failed to load products</div>
        )}

        {!products.length && !loading && !error ? (
          <p className="alert alert-info">Nothing to show here</p>
        ) : (
          products.map((product) => (
            <div key={product.name} className="col-4 py-2">
              <div className="card ">
                <div className="card-body text-center">
                  <p className="text-primary">{product.name}</p>
                  <span>Qty: {product.totalQuantity}</span>
                </div>
              </div>
            </div>
          ))
        )}

        {products.length ? (
          <div style={{ overflow: "scroll" }} className="mt-3">
            <BarChart
              data={products.map(({ name, totalQuantity }) => ({
                name: name,
                quantity: totalQuantity,
              }))}
              width={730}
              height={250}
            >
              <XAxis dataKey="name" />
              <YAxis dataKey="quantity" />
              <Legend />
              <Bar dataKey="quantity" fill="#8884d8" />
            </BarChart>
          </div>
        ) : null}
      </div>
    </div>
  );
}

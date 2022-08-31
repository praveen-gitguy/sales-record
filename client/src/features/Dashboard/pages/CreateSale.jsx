import React from "react";
import { useDashboardContext } from "../../../services/dashboard/dashboard.context";
import SaleForm from "../components/SaleForm";

const formDefaultValues = {
  name: "",
  quantity: 1,
  amount: 1,
};

export default function CreateSale() {
  const { sale, createSale } = useDashboardContext();

  return (
    <div>
      <h1 className="text-center mb-4">Create Sale</h1>
      <SaleForm
        defaultValues={formDefaultValues}
        onSubmit={createSale}
        isSubmitting={sale.loading}
      />
    </div>
  );
}

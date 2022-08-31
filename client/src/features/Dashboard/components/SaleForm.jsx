import React from "react";
import { useForm } from "react-hook-form";
import Loader from "../../../components/Loader";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const validationSchema = yup.object({
  name: yup.string().required("Enter product name"),
  quantity: yup.number().min(1),
  amount: yup.number().min(1),
});

export default function SaleForm({ defaultValues, onSubmit, isSubmitting }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues, resolver: yupResolver(validationSchema) });

  const onFormSubmit = (value) => {
    if (isSubmitting) return;

    onSubmit(value);
  };

  return (
    <div className="d-flex justify-content-center">
      <form
        noValidate
        onSubmit={handleSubmit(onFormSubmit)}
        className="p-5 shadow w-100 needs-validation"
        style={{ maxWidth: "600px" }}
      >
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name*
          </label>
          <input {...register("name")} id="name" className="form-control" />
          {errors?.name && (
            <div className="mt-2 alert alert-danger">{errors.name.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="qty" className="form-label">
            Quantity*
          </label>
          <input
            {...register("quantity")}
            type={"number"}
            min={1}
            id="qty"
            className="form-control"
          />
          {errors?.quantity && (
            <div className="mt-2 alert alert-danger">
              {errors.quantity.message}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="amt" className="form-label">
            Amount*
          </label>
          <input
            {...register("amount")}
            type={"number"}
            min={1}
            id="amt"
            className="form-control"
          />
          {errors?.amount && (
            <div className="mt-2 alert alert-danger">
              {errors.amount.message}
            </div>
          )}
        </div>

        <div>
          <button className="btn btn-primary" disabled={isSubmitting}>
            Save {isSubmitting && <Loader />}
          </button>
        </div>
      </form>
    </div>
  );
}

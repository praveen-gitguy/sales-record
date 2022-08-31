import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Loader from "../../../components/Loader";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email id")
    .required("Enter a valid email id"),
  password: yup
    .string()
    .required("Enter password with alteast 6 charaters")
    .test(
      "len",
      "Enter password with alteast 6 charaters",
      (val) => val.length >= 6
    ),
});

export default function AuthForm({
  defaultValues,
  onFormSubmit,
  btnText,
  isSubmitting,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (value) => {
    if (isSubmitting) return;
    onFormSubmit(value);
  };

  return (
    <div className="d-flex justify-content-center">
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="shadow p-5 w-100 needs-validation"
        style={{ maxWidth: "500px" }}
      >
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email*
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="form-control"
          />
          {errors?.email && (
            <div className="alert alert-danger mt-2">
              {errors.email.message}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password*
          </label>
          <input
            type="password"
            id="password"
            {...register("password")}
            className="form-control"
          />
          {errors?.password && (
            <div className="alert alert-danger mt-2">
              {errors.password.message}
            </div>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {btnText?.length ? btnText : "Signup"} {isSubmitting && <Loader />}
          </button>
        </div>
      </form>
    </div>
  );
}

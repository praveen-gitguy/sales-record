import React from "react";
import { useAuthContext } from "../../../services/auth/auth.context";
import AuthForm from "../components/AuthForm";

const defautValues = { email: "", password: "" };

export default function SigninPage() {
  const { signin, authState } = useAuthContext();
  const { loading, error } = authState;

  return (
    <div>
      <h1 className="text-center">Signin</h1>
      <AuthForm
        defaultValues={defautValues}
        onFormSubmit={signin}
        isSubmitting={loading && !error}
        btnText="Signin"
      />
    </div>
  );
}

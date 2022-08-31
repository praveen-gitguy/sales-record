import React from "react";
import { useAuthContext } from "../../../services/auth/auth.context";
import AuthForm from "../components/AuthForm";

const defautValues = { email: "", password: "" };

export default function SignupPage() {
  const { signup, authState } = useAuthContext();
  const { loading, error } = authState;

  return (
    <div>
      <h1 className="text-center">Signup</h1>
      <AuthForm
        defaultValues={defautValues}
        onFormSubmit={signup}
        isSubmitting={loading && !error}
      />
    </div>
  );
}

import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../services/auth/auth.context";

export default function AuthLayout() {
  const navigate = useNavigate();
  const { authState } = useAuthContext();
  const { profileFetchRequestCompleted, user } = authState;

  useEffect(() => {
    if (profileFetchRequestCompleted && user) {
      navigate(-1, { replace: true });
    }
  }, [profileFetchRequestCompleted, user, navigate]);

  return (
    <div>
      <Outlet />
    </div>
  );
}

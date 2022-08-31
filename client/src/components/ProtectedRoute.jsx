import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../services/auth/auth.context";
import Loader from "./Loader";

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const { authState } = useAuthContext();
  const { user, profileFetchRequestCompleted } = authState;

  if (!profileFetchRequestCompleted) return <Loader />;

  if (profileFetchRequestCompleted && !user) {
    return <Navigate to={`/auth/signin`} state={{ from: location }} replace />;
  }

  return children;
}

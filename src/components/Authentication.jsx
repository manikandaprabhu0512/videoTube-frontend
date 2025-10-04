import { Navigate } from "react-router-dom";
import Loader from "./Loader";
import { useCurrentUser } from "./hooks/useUser";

export default function ProtectedRoute({ children }) {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) return <Loader isLoading={true} />;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

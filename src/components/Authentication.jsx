import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loader from "./Loader";
import { fetchUserData } from "../Api/users";

export default function ProtectedRoute({ children }) {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUserData,
    // retry: false,
  });

  if (isLoading) return <Loader isLoading={true} />;

  if (isError || !user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

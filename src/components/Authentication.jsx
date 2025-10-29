import { Navigate } from "react-router-dom";
import Loader from "./Loader";
import { useCurrentUser } from "./hooks/useUser";
import Login from "./Login/Login";

export default function ProtectedRoute({ children }) {
  const { data: user, isLoading, isError } = useCurrentUser();

  if (isLoading) return <Loader isLoading={true} />;

  if (isError) {
    return (
      <div>
        <h2>Server Unavailable</h2>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return children;
}

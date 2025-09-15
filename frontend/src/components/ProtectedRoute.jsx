import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();

  // 1️⃣ If user not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2️⃣ If a requiredRole is provided and user role doesn't match, redirect to notes
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/notes" replace />;
  }

  return children;
};

export default ProtectedRoute;

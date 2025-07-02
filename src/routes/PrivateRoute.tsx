import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import type { RootState } from "../redux/reducers/store";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  // Add loading state if needed
  // if (isAuthenticated === undefined) return <LoadingSpinner />;

  // More robust check
  return isAuthenticated === 'success' ? children : <Navigate to="/auth/login" replace />;
};

export default PrivateRoute;
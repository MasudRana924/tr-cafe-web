import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import type { RootState } from "../redux/reducers/store";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const location = useLocation();
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  if (isAuthenticated === 'success') {
    return children;
  }

  // Pass the entire location object, not just pathname
  return  <Navigate to="/auth/login" state={{ from: location }} replace />;
;
};

export default PrivateRoute;
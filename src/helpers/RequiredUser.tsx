import React from "react";
import { useCookies } from "react-cookie";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner";
import { userApi } from "../redux/api/userApi";

const RequiredUser = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const [cookies] = useCookies();
  const location = useLocation();

  const { isLoading, isFetching } = userApi.endpoints.getMe.useQuery(null, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });

  const loading = isLoading || isFetching;

  if (loading) <Spinner />;

  const user = userApi.endpoints.getMe.useQueryState(null);

  return (cookies.logged_in || user) &&
    allowedRoles.includes(user.data?.role as string) ? (
    <Outlet />
  ) : cookies.logged_in && user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequiredUser;

import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLogoutMutation } from "../redux/api/authApi";
import { useAppSelector } from "../redux/store";
import Spinner from "./Spinner";

const Header = () => {
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();

  const [logoutUser, { isLoading, isError, error, isSuccess }] =
    useLogoutMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("You are successfully logged out");
      navigate("/login");
    }

    if (isError) {
      if (Array.isArray((error as any).data.error)) {
        (error as any).data.error.forEach((er: any) => {
          toast.error(er.message);
        });
      } else {
        toast.error((error as any).data.message);
      }
    }
  }, [isLoading]);

  const onLogoutHandler = async () => {
    logoutUser();
  };

  return (
    <nav className="bg-gray-900 px-4 py-4 text-white">
      {isLoading && <Spinner />}
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-7">
          <Link to="/">
            <h1 className="text-xl font-bold">JWT Auth</h1>
          </Link>
          <Link to="/profile">
            <h3>Profile</h3>
          </Link>
        </div>
        <div className="flex items-center space-x-5">
          <h1>{user?.name}</h1>
          <button
            className="rounded-xl bg-gray-700 px-4 py-2 font-medium"
            onClick={onLogoutHandler}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;

import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { object, string, TypeOf } from "zod";
import Spinner from "../components/Spinner";
import { useLoginMutation } from "../redux/api/authApi";

const loginSchema = object({
  email: string()
    .min(1, "Email address is required")
    .email("Email address is invalid"),
  password: string()
    .min(1, "Password is required")
    .min(6, "Password must be more than 6 characters"),
});

export type LoginInput = TypeOf<typeof loginSchema>;

const Login = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = useForm<LoginInput>();

  const [loginUser, { isLoading, isError, error, isSuccess }] =
    useLoginMutation();

  const navigate = useNavigate();
  const location = useLocation();

  const from = ((location.state as any)?.from.pathname as string) || "/profile";
  console.log("from", from);

  useEffect(() => {
    if (isSuccess) {
      toast.success("You successfully logged in");
      navigate(from);
    }

    if (isError) {
      if (Array.isArray((error as any)?.data.error)) {
        (error as any).data.error.forEach((er: any) => {
          toast.error(er.message);
        });
      } else {
        toast.error((error as any).data.message);
      }
    }
  }, [isLoading]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
    loginUser(values);
  };

  return (
    <div className="grid h-screen place-items-center content-center">
      {isLoading && <Spinner />}
      <h1 className="mb-7 text-center text-4xl font-semibold text-gray-700">
        Gemini Cafe
      </h1>
      <div className="mx-auto flex max-w-sm overflow-hidden rounded-lg bg-white shadow-lg lg:max-w-4xl">
        <div className="hidden h-[550px] w-fit lg:block">
          <img
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1496989981497-27d69cdad83e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            alt="black-hole"
          />
        </div>
        <div className="w-full px-8 pb-8 pt-2 lg:w-1/2">
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <h1 className="text-center text-2xl font-semibold uppercase text-gray-600 underline">
              Sign In
            </h1>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="block w-full appearance-none rounded border border-gray-300 bg-gray-200 py-2 px-4 text-gray-700 outline-none"
                autoComplete="off"
                {...register("email")}
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="block w-full appearance-none rounded border border-gray-300 bg-gray-200 py-2 px-4 text-gray-700 outline-none"
                {...register("password")}
              />
            </div>
            <div className="mt-8">
              <button
                type="submit"
                className="w-full rounded bg-gray-700 py-2 px-4 font-bold text-white hover:bg-gray-600"
              >
                Login
              </button>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="w-1/5 border-b md:w-1/4" />
              <Link to="/register">
                <p className="cursor-pointer text-xs uppercase text-gray-500">
                  or sign up
                </p>
              </Link>
              <span className="w-1/5 border-b md:w-1/4" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

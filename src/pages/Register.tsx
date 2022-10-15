import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { object, string, TypeOf } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRegisterMutation } from "../redux/api/authApi";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

const registerSchema = object({
  name: string().min(1, "Name is required").max(100),
  email: string().min(1, "Email is required").email("Email address is invalid"),
  password: string()
    .min(1, "Password is required")
    .min(6, "Password must be more than 6 characters"),
  confirmPassword: string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Password do not match",
});

export type RegisterInput = TypeOf<typeof registerSchema>;

const Register = () => {
  const {
    reset,
    handleSubmit,
    register,
    formState: { isSubmitSuccessful },
  } = useForm<RegisterInput>();

  const [registerUser, { isLoading, isSuccess, isError, error }] =
    useRegisterMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      toast.success("User registered successfuly");
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

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<RegisterInput> = (value) => {
    registerUser(value);
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
        <div className="w-full px-8 pt-2 lg:w-1/2">
          <h1 className="text-center text-2xl font-semibold uppercase text-gray-600 underline">
            Sign Up
          </h1>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="mt-8">
              <label
                htmlFor="fullname"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Fullname
              </label>
              <input
                type="text"
                id="fullname"
                className="block w-full appearance-none rounded border border-gray-300 bg-gray-200 py-2 px-4 text-gray-700 outline-none"
                {...register("name")}
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Email Address
              </label>
              <input
                type="text"
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
            <div className="mt-4">
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="block w-full appearance-none rounded border border-gray-300 bg-gray-200 py-2 px-4 text-gray-700 outline-none"
                {...register("confirmPassword")}
              />
            </div>
            <div className="mt-8">
              <button className="w-full rounded bg-gray-700 py-2 px-4 font-bold text-white hover:bg-gray-600">
                Register
              </button>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="w-1/5 border-b md:w-1/4" />
              <Link to="/login">
                <p className="cursor-pointer text-xs uppercase text-gray-500">
                  or sign in
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

export default Register;

import { createApi } from "@reduxjs/toolkit/query/react";
import { RegisterInput } from "../../pages/Register";
import customFetchBaseQuery from "./customFetchBaseQuery";
import { IUser } from "./types";
import { LoginInput } from "../../pages/Login";
import { userApi } from "./userApi";

export const authApi = createApi({
  reducerPath: "auth-api",
  baseQuery: customFetchBaseQuery,
  endpoints: (builder) => ({
    register: builder.mutation<IUser, RegisterInput>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),

      transformResponse: (result: { data: { user: IUser } }) => {
        return result.data.user;
      },
    }),
    login: builder.mutation<
      { access_token: string; status: string },
      LoginInput
    >({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApi.endpoints.getMe.initiate(null));
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "DELETE",
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } =
  authApi;

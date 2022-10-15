import { createApi } from "@reduxjs/toolkit/query/react";
import { setUser } from "../features/userSlice";
import customFetchBaseQuery from "./customFetchBaseQuery";
import { IUser } from "./types";

export const userApi = createApi({
  reducerPath: "user-api",
  baseQuery: customFetchBaseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getMe: builder.query<IUser, null>({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),

      transformResponse: (result: { data: { user: IUser } }) => {
        return result.data.user;
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
  }),
});

import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import { logout } from "../features/userSlice";

const baseUrl = process.env.REACT_APP_SERVER_ENDPOINT;

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
});

const customFetchBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);
  if ((result.error?.data as any)?.message === "You are not logged in") {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshResult = await baseQuery(
          { credentials: "include", url: "auth/refresh" },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          // Retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
          window.location.href = "/login";
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();

      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export default customFetchBaseQuery;

import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { BaseQueryFn, FetchArgs } from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:4000"; // Nest.js backend URL

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    // You can add auth token here later
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const refreshBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");

  console.log("Inside base query with reauth");

  if (result.error && result.error.status === 401) {
    console.log("Inside error result");
    // Try to refresh the token
    const refreshResult = await refreshBaseQuery(
      {
        url: "/auth/refresh",
        method: "POST",
        body: { refreshToken },
        headers: {
          authorization: `Bearer ${refreshToken}`,
        },
      },
      api,
      extraOptions,
    );

    console.log("Refresh Result --->> ", refreshResult.data);

    if (refreshResult.data) {
      // Store the new token
      localStorage.setItem("token", (refreshResult.data as any).accessToken);
      localStorage.setItem(
        "refreshToken",
        (refreshResult.data as any).refreshToken,
      );
      localStorage.setItem(
        "user",
        JSON.stringify((refreshResult.data as any).user),
      );

      console.log(
        "Retrying Base query after setting new tokens in local storage",
      );

      // Retry the original query with the new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // If refresh also fails, you might want to log out the user or handle it accordingly
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: ["User", "Auth", "Arena"],
});

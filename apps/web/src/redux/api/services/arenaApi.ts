import { baseApi } from "../baseApi";

export const arenaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerArena: builder.mutation({
      query: (arenaData) => ({
        url: "/arena/create",
        method: "POST",
        body: arenaData,
      }),
      invalidatesTags: ["Arena"],
    }),
  }),
});

export const { useRegisterArenaMutation } = arenaApi;

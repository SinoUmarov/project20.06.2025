import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rtctodoApi = createApi({
  reducerPath: "rtccategoriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://to-dos-api.softclub.tj/api" }),
  tagTypes: ["Categories"],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/to-dos",
      providesTags: ["Categories"],
    }),
    getCategoryById: builder.query({
      query: (id) => `/to-dos/${id}`,
    }),
    addCategory: builder.mutation({
      query: (newCategory) => ({
        url: "/to-dos",
        method: "POST",
        body: newCategory,
      }),
      invalidatesTags: ["Categories"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: "/to-dos",
        method: "PUT",
        body: { id, ...rest },
      }),
      invalidatesTags: ["Categories"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/to-dos?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = rtctodoApi;

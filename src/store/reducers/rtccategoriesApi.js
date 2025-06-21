import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rtccategoriesApi = createApi({
  reducerPath: "rtccategoriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://to-dos-api.softclub.tj/api" }),
  tagTypes: ["Categories"],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/categories",
      providesTags: ["Categories"],
    }),
    getCategoryById: builder.query({
      query: (id) => `/categories/${id}`,
    }),
    addCategory: builder.mutation({
      query: (newCategory) => ({
        url: "/categories",
        method: "POST",
        body: newCategory,
      }),
      invalidatesTags: ["Categories"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: "/categories",
        method: "PUT",
        body: { id, ...rest },
      }),
      invalidatesTags: ["Categories"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories?id=${id}`,
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
} = rtccategoriesApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
    getProducts: builder.query({
      query: ({ page = 1, searchQuery = "" }) =>`products?_page=${page}&_limit=5&q=${searchQuery}`,
      providesTags: ["products"],
    }),
    createProduct: builder.mutation({
      query: (product) => ({
        url: "products",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["products"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...product }) => ({
        url: `products/${id}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ["products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
   
  }),
});

export const {
  useLoginMutation,
  useGetProductsQuery,

  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation

} = apiSlice;

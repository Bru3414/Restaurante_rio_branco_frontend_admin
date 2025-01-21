import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Product, ProductPayload } from '../types'

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080'
  }),
  tagTypes: ['produtos'],
  endpoints: (builder) => ({
    getAllProdutos: builder.query<Product[], void>({
      query: () => '/products',
      providesTags: ['produtos']
    }),
    createProduct: builder.mutation<Product, ProductPayload>({
      query: (body) => ({
        url: '/products',
        method: 'POST',
        body
      }),
      invalidatesTags: ['produtos']
    }),
    updateProduct: builder.mutation<Product, Product>({
      query: (body) => ({
        url: '/products',
        method: 'PUT',
        body
      }),
      invalidatesTags: ['produtos']
    }),
    deleteProduct: builder.mutation<void, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['produtos']
    })
  })
})

export const {
  useGetAllProdutosQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation
} = api
export default api

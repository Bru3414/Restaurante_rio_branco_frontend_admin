import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ImageProduct, Product, ProductPayload } from '../types'

interface UploadMetadata {
  [data: string]: string
}

interface UploadRequest {
  file: File
  data: string
}

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
    }),
    uploadImageProduto: builder.mutation<string, UploadRequest>({
      query: ({ file, data }: { file: File; data: string }) => {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('name', data) // Envia o JSON como string

        return {
          url: '/products/images',
          method: 'POST',
          body: formData
        }
      }
    })
  })
})

export const {
  useGetAllProdutosQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useUploadImageProdutoMutation
} = api
export default api

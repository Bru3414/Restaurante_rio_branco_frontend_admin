import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ImageProduct, ImageProductDB, Product, ProductPayload } from '../types'

interface UploadMetadata {
  [data: string]: string
}

interface UploadRequest {
  file: File
  data: string
}

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080',
    prepareHeaders: (headers) => {
      headers.set(
        'Authorization',
        `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJicnVubzM0MTQuZGFtYnJvc2tpQGdtYWlsLmNvbSIsImlhdCI6MTc0Mzk1MjU1MSwiZXhwIjoxNzQ0NTU3MzUxfQ.8Es-tiM4mHAp-QIgXcFSktxiemA9yrOb-u-P0neQa5S8Hyg1wRywfLZRwf317YBtfCrWyvK0C_o9AzPRqzhcKQ`
      )

      return headers
    }
  }),
  tagTypes: ['produtos', 'produtos/images'],
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
    uploadImageProduto: builder.mutation<ImageProductDB, UploadRequest>({
      query: ({ file, data }: { file: File; data: string }) => {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('name', data)

        return {
          url: '/products/images',
          method: 'POST',
          body: formData
        }
      },
      invalidatesTags: ['produtos/images']
    }),
    getAllImagesProducts: builder.query<ImageProductDB[], void>({
      query: () => '/products/images',
      providesTags: ['produtos/images']
    }),
    deleteImageProduct: builder.mutation<void, number>({
      query: (id) => ({
        url: `/products/images/${id}`,
        method: 'DELETE'
      })
    })
  })
})

export const {
  useGetAllProdutosQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useUploadImageProdutoMutation,
  useGetAllImagesProductsQuery,
  useDeleteImageProductMutation
} = api
export default api

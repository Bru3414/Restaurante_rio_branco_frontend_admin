import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  ImageProduct,
  ImageProductDB,
  Order,
  Product,
  ProductPayload
} from '../types'

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
      // Esta assim apenas para desenvolvimento
      // Quando eu trabalhar na parte de adiministradores, isso sera ajustado
      headers.set(
        'Authorization',
        `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJicnVubzM0MTQuZGFtYnJvc2tpQGdtYWlsLmNvbSIsImlhdCI6MTc0NDQ4NDA0OSwiZXhwIjoxNzQ1MDg4ODQ5fQ.578onyxPfo9vkjFHshhEJRfSPDU9I8p3WZLfRraPHzcuaTzlXAh2au1Ly2Bi7lbH2jmR2D8mq-jmh9AxkBbLsw`
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
    }),
    getOrdersForOrdersPanelApi: builder.query<Order[], void>({
      query: () => '/order/get-orders-for-orders-panel'
    }),
    handleOrderStatus: builder.mutation<void, Order>({
      query: (body) => ({
        url: '/order/handle-order-status',
        method: 'PUT',
        body
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
  useDeleteImageProductMutation,
  useGetOrdersForOrdersPanelApiQuery,
  useHandleOrderStatusMutation
} = api
export default api

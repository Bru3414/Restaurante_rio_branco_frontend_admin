import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  FilterOrderRequest,
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
      /* Esta assim apenas para desenvolvimento
      Quando eu trabalhar na parte de adiministradores, isso sera ajustado */
      headers.set(
        'Authorization',
        `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJicnVubzM0MTQuZGFtYnJvc2tpQGdtYWlsLmNvbSIsImlhdCI6MTc0NjM2OTU3OCwiZXhwIjoxNzQ2OTc0Mzc4fQ.-rLgQZfxKY3e3QpQRsA5HrmWxkK16Ai8NrDuwBk60VFuMqzHqF1AIkubs2Mv0I_eUthfR8O5-TmjTMmdtKG9SQ`
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
    getOrdersByFilter: builder.mutation<Order[], FilterOrderRequest>({
      query: (body) => ({
        url: '/order/get-orders-filter',
        method: 'POST',
        body
      })
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
  useGetOrdersByFilterMutation,
  useHandleOrderStatusMutation
} = api
export default api

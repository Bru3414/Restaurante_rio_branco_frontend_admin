import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import marmita from '../../assets/images/img_marmita.png'
import { Product, ProductPayload } from '../../types'
import { Category } from '../../utils/enums/Product'

type ProductPanelState = {
  items: Product[]
}

const initialState: ProductPanelState = {
  items: []
}

const productPanelSlice = createSlice({
  name: 'productPanel',
  initialState,
  reducers: {
    buscarProdutos: (state, action: PayloadAction<Product[]>) => {
      state.items = []

      action.payload.forEach((item) => {
        state.items.push({
          id: item.id,
          category: item.category,
          description: item.description,
          image: item.image,
          isInMenu: item.isInMenu,
          name: item.name,
          price: item.price
        })
      })
    },
    update: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      )

      if (index >= 0) {
        state.items[index] = action.payload
      }
    },
    excluir: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    create: (state, action: PayloadAction<Product>) => {
      const produto: Product = {
        id: action.payload.id,
        category: action.payload.category,
        description: action.payload.description,
        image: action.payload.image,
        isInMenu: action.payload.isInMenu,
        name: action.payload.name,
        price: action.payload.price
      }

      state.items.push(produto)
    },
    alteraImageDefaultProduto: (state, action: PayloadAction<number>) => {
      state.items.forEach((item) => {
        if (item.image.id === action.payload) {
          item.image = {
            id: -1,
            name: '',
            url: 'https://resriobranco-images.s3.sa-east-1.amazonaws.com/item_no_image/item_no_image.png'
          }
        }
      })
    }
  }
})

export const {
  buscarProdutos,
  create,
  update,
  excluir,
  alteraImageDefaultProduto
} = productPanelSlice.actions
export default productPanelSlice.reducer

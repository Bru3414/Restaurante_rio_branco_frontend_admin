import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import marmita from '../../assets/images/img_marmita.png'
import { Product, ProductPayload } from '../../types'
import { Category } from '../../utils/enums/Product'

type ProductPanelState = {
  items: Product[]
}

const initialState: ProductPanelState = {
  items: [
    {
      id: 1,
      name: 'Marmita',
      description:
        'Arroz, feijão, farofa, macarrão, maionese, 2 tipos de carne a escolha. +CARNE',
      img: marmita,
      isInMenu: true,
      price: 20,
      category: Category.MARMITA
    },
    {
      id: 2,
      name: 'Marmita',
      description:
        'Arroz, feijão, farofa, macarrão, maionese, 2 tipos de carne a escolha. +CARNE',
      img: marmita,
      isInMenu: true,
      price: 20,
      category: Category.MARMITA
    },
    {
      id: 3,
      name: 'Coca Cola Lata',
      description: 'Coca Lata',
      img: marmita,
      isInMenu: true,
      price: 20,
      category: Category.BEBIDA
    }
  ]
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
          img: item.img,
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
        img: action.payload.img,
        isInMenu: action.payload.isInMenu,
        name: action.payload.name,
        price: action.payload.price
      }

      state.items.push(produto)
    }
  }
})

export const { buscarProdutos, create, update, excluir } =
  productPanelSlice.actions
export default productPanelSlice.reducer

import { configureStore } from '@reduxjs/toolkit'
import orderPanelReducer from './reducers/orderPanel'
import productPanelReducer from './reducers/productPanel'
import pesquisaProdutoReducer from './reducers/pesquisaProduto'
import api from '../services/api'

export const store = configureStore({
  reducer: {
    orderPanel: orderPanelReducer,
    productPanel: productPanelReducer,
    pesquisaProduto: pesquisaProdutoReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
})

export type RootReducer = ReturnType<typeof store.getState>

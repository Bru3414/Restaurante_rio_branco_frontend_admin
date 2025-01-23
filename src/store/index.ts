import { configureStore } from '@reduxjs/toolkit'
import orderPanelReducer from './reducers/orderPanel'
import productPanelReducer from './reducers/productPanel'
import pesquisaProdutoReducer from './reducers/pesquisaProduto'
import imagePanelReducer from './reducers/imagePanel'
import api from '../services/api'

export const store = configureStore({
  reducer: {
    orderPanel: orderPanelReducer,
    productPanel: productPanelReducer,
    pesquisaProduto: pesquisaProdutoReducer,
    imagePanel: imagePanelReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['your/action/type'],
        // Ignore these field paths in all actions
        ignoredActionPaths: [
          'meta.arg',
          'payload.timestamp',
          'meta.baseQueryMeta.request',
          'payload.file',
          'meta.baseQueryMeta.response'
        ],
        // Ignore these paths in the state
        ignoredPaths: ['imagePanel']
      }
    }).concat(api.middleware)
})

export type RootReducer = ReturnType<typeof store.getState>

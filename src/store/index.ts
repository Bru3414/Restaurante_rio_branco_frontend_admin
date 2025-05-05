import { configureStore } from '@reduxjs/toolkit'
import orderPanelReducer from './reducers/orderPanel'
import productPanelReducer from './reducers/productPanel'
import pesquisaProdutoReducer from './reducers/pesquisaProduto'
import imagePanelReducer from './reducers/imagePanel'
import recordsPanelReducer from './reducers/recordsPanel'
import api from '../services/api'

export const store = configureStore({
  reducer: {
    orderPanel: orderPanelReducer,
    productPanel: productPanelReducer,
    pesquisaProduto: pesquisaProdutoReducer,
    imagePanel: imagePanelReducer,
    recordsPanel: recordsPanelReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['your/action/type'],
        ignoredActionPaths: [
          'meta.arg',
          'payload.timestamp',
          'meta.baseQueryMeta.request',
          'payload.file',
          'meta.baseQueryMeta.response'
        ],
        ignoredPaths: ['imagePanel']
      }
    }).concat(api.middleware)
})

export type RootReducer = ReturnType<typeof store.getState>

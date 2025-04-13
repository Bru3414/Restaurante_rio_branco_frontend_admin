import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Order } from '../../types'

type OrderPanelState = {
  items: Order[]
}

const initialState: OrderPanelState = {
  items: []
}

const orderPanelSlice = createSlice({
  name: 'orderPanel',
  initialState,
  reducers: {
    atualizaOrders: (state, action: PayloadAction<Order[]>) => {
      state.items = action.payload
    }
  }
})

export const { atualizaOrders } = orderPanelSlice.actions
export default orderPanelSlice.reducer

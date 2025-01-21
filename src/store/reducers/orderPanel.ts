import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Order = {
  nPedido: number
  name: string
  time: string
  bairro: string
  status: 'APROVAR' | 'CONCLUIR' | 'FINALIZAR'
}

type OrderPanelState = {
  items: Order[]
}

const initialState: OrderPanelState = {
  items: [
    {
      nPedido: 1,
      name: 'Bruno',
      time: '11:45',
      bairro: 'Setor 5',
      status: 'APROVAR'
    },
    {
      nPedido: 2,
      name: 'Ana',
      time: '11:45',
      bairro: 'Setor 5',
      status: 'APROVAR'
    },
    {
      nPedido: 3,
      name: 'João',
      time: '11:45',
      bairro: 'Setor 5',
      status: 'APROVAR'
    }
  ]
}

const orderPanelSlice = createSlice({
  name: 'orderPanel',
  initialState,
  reducers: {
    handleStatus: (state, action: PayloadAction<number>) => {
      const order = state.items.find((item) => item.nPedido === action.payload)

      if (order) {
        switch (order.status) {
          case 'APROVAR':
            order.status = 'CONCLUIR'
            break
          case 'CONCLUIR':
            order.status = 'FINALIZAR'
            break
          case 'FINALIZAR':
            state.items = state.items.filter(
              (item) => item.nPedido != action.payload
            )
            break
        }
      }
    }
  }
})

export const { handleStatus } = orderPanelSlice.actions
export default orderPanelSlice.reducer

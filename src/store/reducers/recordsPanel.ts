import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FilterOrderRequest, Order } from '../../types'

type RecordsPanel = {
  filter: FilterOrderRequest
  items: Order[]
}

const initialState: RecordsPanel = {
  filter: {},
  items: []
}

const recordsPanelSlice = createSlice({
  name: 'recordsPanel',
  initialState,
  reducers: {
    atualizaRecords: (state, action: PayloadAction<Order[]>) => {
      state.items = action.payload
    },
    atualizaFilter: (state, action: PayloadAction<FilterOrderRequest>) => {
      state.filter = action.payload
    }
  }
})

export const { atualizaRecords, atualizaFilter } = recordsPanelSlice.actions
export default recordsPanelSlice.reducer

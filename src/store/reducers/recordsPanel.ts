import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FilterOrderRequest, FilterOrderResponse, Order } from '../../types'

type RecordsPanel = {
  filter: FilterOrderRequest
  items: FilterOrderResponse
}

const initialState: RecordsPanel = {
  filter: {
    nPage: 1
  },
  items: {
    orders: [],
    totalPages: 1,
    currentPage: 1
  }
}

const recordsPanelSlice = createSlice({
  name: 'recordsPanel',
  initialState,
  reducers: {
    atualizaRecords: (state, action: PayloadAction<FilterOrderResponse>) => {
      state.items = action.payload
    },
    atualizaFilter: (state, action: PayloadAction<FilterOrderRequest>) => {
      state.filter = action.payload
    },
    atualizaCurrentPage: (state, action: PayloadAction<number>) => {
      state.filter.nPage = action.payload
    }
  }
})

export const { atualizaRecords, atualizaFilter, atualizaCurrentPage } =
  recordsPanelSlice.actions
export default recordsPanelSlice.reducer

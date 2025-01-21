import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Category } from '../../utils/enums/Product'

type FiltroState = {
  termo: string
}

const initialState: FiltroState = {
  termo: ''
}

const pesquisaProdutoSlice = createSlice({
  name: 'pesquisaProduto',
  initialState,
  reducers: {
    alterarTermo: (state, action: PayloadAction<string>) => {
      state.termo = action.payload
    }
  }
})

export const { alterarTermo } = pesquisaProdutoSlice.actions
export default pesquisaProdutoSlice.reducer

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ImageProduct } from '../../types'

const initialState: ImageProduct = {
  name: '',
  url: ''
}

const imagePanelSlice = createSlice({
  name: 'imagePanel',
  initialState,
  reducers: {
    handleImage: (state, action: PayloadAction<ImageProduct>) => {
      state.file = action.payload.file
      state.name = action.payload.name
      state.url = action.payload.url
    }
  }
})

export const { handleImage } = imagePanelSlice.actions
export default imagePanelSlice.reducer

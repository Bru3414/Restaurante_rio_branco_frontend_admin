import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ImageProduct, ImageProductDB } from '../../types'

type ImagePanelState = {
  items: ImageProductDB[]
  image: ImageProduct
  imageSelected: ImageProductDB
}

const initialState: ImagePanelState = {
  items: [
    {
      id: 0,
      name: '',
      url: ''
    }
  ],
  image: {
    url: '',
    name: ''
  },
  imageSelected: {
    id: -1,
    name: '',
    url: ''
  }
}

const imagePanelSlice = createSlice({
  name: 'imagePanel',
  initialState,
  reducers: {
    buscarImagensProdutos: (state, action: PayloadAction<ImageProductDB[]>) => {
      state.items = []

      action.payload.forEach((item) => {
        state.items.push({
          id: item.id,
          name: item.name,
          url: item.url
        })
      })
    },
    handleImage: (state, action: PayloadAction<ImageProduct>) => {
      state.image.file = action.payload.file
      state.image.name = action.payload.name
      state.image.url = action.payload.url
    },
    handleImageSelected: (state, action: PayloadAction<ImageProductDB>) => {
      state.imageSelected = {
        id: action.payload.id,
        name: action.payload.name,
        url: action.payload.url
      }
    },
    createImage: (state, action: PayloadAction<ImageProductDB>) => {
      const imageProduct: ImageProductDB = {
        id: action.payload.id,
        name: action.payload.name,
        url: action.payload.url
      }

      state.items.push(imageProduct)
    },
    updateImage: (state, action: PayloadAction<ImageProductDB>) => {
      const imageIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      )

      if (imageIndex >= 0) {
        state.items[imageIndex] = action.payload
      }
    },
    deleteImage: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)

      if (state.imageSelected.id === action.payload) {
        state.imageSelected = {
          id: -1,
          name: '',
          url: ''
        }
      }
    }
  }
})

export const {
  handleImage,
  buscarImagensProdutos,
  createImage,
  deleteImage,
  handleImageSelected,
  updateImage
} = imagePanelSlice.actions
export default imagePanelSlice.reducer

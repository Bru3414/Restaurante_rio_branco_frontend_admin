import { Category } from './utils/enums/Product'

declare type Product = {
  id: number
  name: string
  description: string
  price: number
  isInMenu: boolean
  image: ImageProductDB
  category: Category
}

declare type ProductPayload = {
  name: string
  description: string
  price: number
  isInMenu: boolean
  image: ImageProductDB
  category: Category
}

declare type ImageProduct = {
  url: string
  file?: File
  name?: string
}

declare type ImageProductDB = {
  id: number
  name: string
  url: string
}

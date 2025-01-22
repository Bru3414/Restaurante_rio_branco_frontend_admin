import { Category } from './utils/enums/Product'

declare type Product = {
  id: number
  name: string
  description: string
  price: number
  isInMenu: boolean
  img: string
  category: Category
}

declare type ProductPayload = {
  name: string
  description: string
  price: number
  isInMenu: boolean
  img: string
  category: Category
}

declare type ImageProduct = {
  url: string
  file?: File
  name?: string
}

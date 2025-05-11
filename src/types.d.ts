import { Category } from './utils/enums/Product'

declare module '*.mp3' {
  const src: string
  export default src
}

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

declare type ImageProductDB = {
  id: number
  name: string
  url: string
}

declare type ProductDB = {
  id: number
  name: string
  description: string
  price: number
  isInMenu: boolean
  category: string
  image: ImageProductDB
}

declare type ProductQtdJson = {
  id: number
  product: ProductDB
  quantity: number
  obs: string
  price: number
}

declare type AddressJson = {
  id: number
  address: string
  number: string
  bairro: string
  complement: string
  city: string
  isMain: boolean
  isSelected: boolean
}

declare type Order = {
  id: number
  nOrder: number
  dateTime: string
  status:
    | 'AGUARDANDO_APROVACAO'
    | 'PRODUCAO'
    | 'PRONTO'
    | 'FINALIZADO'
    | 'CANCELADO'
  customer_id: number
  customer_name: string
  productsQtdJson: ProductQtdJson[]
  addressJson: AddressJson
  payment: 'CARTAO' | 'DINHEIRO' | 'PIX'
  troco: string
  subTotal: number
  entregaPrice: number
  totalPrice: number
}

declare type FilterOrderRequest = {
  customerName?: string
  status?:
    | 'AGUARDANDO_APROVACAO'
    | 'PRODUCAO'
    | 'PRONTO'
    | 'FINALIZADO'
    | 'CANCELADO'
  initialDate?: string
  finalDate?: string
  nPage: number
}

declare type FilterOrderResponse = {
  orders: Order[]
  totalPages: number
  currentPage: number
}

import { Route, Routes } from 'react-router-dom'
import OrderPanel from './components/OrderPanel'
import ProductPanel from './components/ProductPanel'
import { Order } from './types'

const Rotas = () => (
  <Routes>
    <Route path="/" element={<OrderPanel />} />
    <Route path="/produtos" element={<ProductPanel />} />
  </Routes>
)

export default Rotas

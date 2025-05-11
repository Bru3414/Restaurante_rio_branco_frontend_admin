import { Route, Routes } from 'react-router-dom'
import OrderPanel from './components/Panels/OrderPanel'
import ProductPanel from './components/Panels/ProductPanel'
import { Order } from './types'
import RecordsPanel from './components/Panels/RecordsPanel'

const Rotas = () => (
  <Routes>
    <Route path="/" element={<OrderPanel />} />
    <Route path="/produtos" element={<ProductPanel />} />
    <Route path="/records" element={<RecordsPanel />} />
  </Routes>
)

export default Rotas

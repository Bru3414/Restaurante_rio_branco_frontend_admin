import * as S from './styles'
import CardOrder from '../CardOrder'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '../../store'
import { handleStatus, Order } from '../../store/reducers/orderPanel'
import { useEffect, useState } from 'react'
import ImagesProducts from '../ImagesProducts'

const OrderPanel = () => {
  const { items } = useSelector((state: RootReducer) => state.orderPanel)
  const dispatch = useDispatch()
  const [aprovarList, setAprovarList] = useState<Order[]>()
  const [concluirList, setConcluirList] = useState<Order[]>()
  const [finalizarList, setFinalizarList] = useState<Order[]>()

  useEffect(() => {
    orderList()
  }, [items])

  const orderList = () => {
    setAprovarList(items.filter((item) => item.status === 'APROVAR'))

    setConcluirList(items.filter((item) => item.status === 'CONCLUIR'))

    setFinalizarList(items.filter((item) => item.status === 'FINALIZAR'))
  }

  const changeStatus = (id: number) => {
    dispatch(handleStatus(id))
  }

  const renderizaPedidos = (
    title: string,
    list: Order[] | undefined
  ): JSX.Element => {
    return (
      <S.OrderDiv>
        <h1>{title}</h1>
        {list ? (
          list.map((item) => (
            <CardOrder
              key={item.nPedido}
              nPedido={item.nPedido}
              name={item.name}
              bairro={item.bairro}
              time={item.time}
              type={item.status}
              onClick={() => changeStatus(item.nPedido)}
            />
          ))
        ) : (
          <div></div>
        )}
      </S.OrderDiv>
    )
  }

  return (
    <S.OrderContainer className="container">
      {renderizaPedidos('Novos Pedidos', aprovarList)}
      {renderizaPedidos('Pedidos Em Preparo', concluirList)}
      {renderizaPedidos('Pedidos Finalizados', finalizarList)}
    </S.OrderContainer>
  )
}

export default OrderPanel

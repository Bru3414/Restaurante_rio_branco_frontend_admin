import * as S from './styles'
import CardOrder from '../../Cards/CardOrder'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '../../../store'
import { atualizaOrders } from '../../../store/reducers/orderPanel'
import { useEffect, useState } from 'react'
import useWebSocket from '../../../services/webSocket'
import { useGetOrdersForOrdersPanelApiQuery } from '../../../services/api'
import { Order } from '../../../types'

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
    setAprovarList(
      items
        .filter((item) => item.status === 'AGUARDANDO_APROVACAO')
        .sort((b, a) => a.nOrder - b.nOrder)
    )

    setConcluirList(
      items
        .filter((item) => item.status === 'PRODUCAO')
        .sort((b, a) => a.nOrder - b.nOrder)
    )

    setFinalizarList(
      items
        .filter((item) => item.status === 'PRONTO')
        .sort((b, a) => a.nOrder - b.nOrder)
    )
  }

  const renderizaPedidos = (
    title: string,
    list: Order[] | undefined
  ): JSX.Element => {
    return (
      <S.OrderDiv>
        <h1>{title}</h1>
        {list ? (
          list.map((item) => <CardOrder key={item.id} order={item} />)
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

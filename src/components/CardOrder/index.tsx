import * as S from './styles'
import lupa from '../../assets/images/lupa.png'
import more from '../../assets/images/more.png'
import { Order } from '../../types'
import { useHandleOrderStatusMutation } from '../../services/api'
import Countdown from '../Countdown'
import { useState } from 'react'
import OrderDetails from '../OrderDetails'
import { parseToBrl } from '../../utils'

type Props = {
  order: Order
}

const CardOrder = ({ order }: Props) => {
  const [
    handleOrderStatus,
    {
      isSuccess: isSuccessHandleOrderStatus,
      isLoading: isLoadingHandleOrderStatus
    }
  ] = useHandleOrderStatusMutation()

  const [isOpenOrderDetails, setIsOpenOrderDetails] = useState<boolean>(false)

  const typeButton = (): string => {
    if (order.status == 'AGUARDANDO_APROVACAO') {
      return 'Aprovar Pedido'
    } else if (order.status == 'PRODUCAO') {
      return 'Concluir Pedido'
    }
    return 'Finalizar Pedido'
  }

  const date = new Date(order.dateTime)
  const timeShort = date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })

  return (
    <>
      <S.CardContainer>
        <S.DivPlus>
          <img
            src={lupa}
            alt="lupa"
            onClick={() => setIsOpenOrderDetails(true)}
          />
          <img src={more} alt="lupa" />
        </S.DivPlus>
        <S.DivContent>
          <S.NPedido>#{order.nOrder}</S.NPedido>
          <h2>{order.customer_name}</h2>
        </S.DivContent>
        <S.DivContent2>
          <S.SpanTimeBairro>{timeShort}</S.SpanTimeBairro>
          <S.SpanTimeBairro>
            {order.addressJson
              ? order.addressJson.bairro.replaceAll('_', ' ')
              : 'Retirada no local'}
          </S.SpanTimeBairro>
        </S.DivContent2>
        <S.Dotted className="dotted" />
        <S.TotalValueDiv>
          <span>Total pedido</span>
          <span>{parseToBrl(order.totalPrice)}</span>
        </S.TotalValueDiv>
        <S.Button
          colorButton={order.status}
          type="button"
          onClick={() => handleOrderStatus(order)}
        >
          {typeButton()}
        </S.Button>
        {order.status === 'AGUARDANDO_APROVACAO' && (
          <Countdown orderDateTime={order.dateTime} />
        )}
      </S.CardContainer>
      <OrderDetails
        isVisible={isOpenOrderDetails}
        order={order}
        onClick={() => setIsOpenOrderDetails(false)}
      />
    </>
  )
}

export default CardOrder

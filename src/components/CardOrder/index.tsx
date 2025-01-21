import * as S from './styles'
import lupa from '../../assets/images/lupa.png'
import more from '../../assets/images/more.png'

type Props = {
  nPedido: number
  name: string
  time: string
  bairro: string
  onClick: () => void
  type: 'APROVAR' | 'CONCLUIR' | 'FINALIZAR'
}

const CardOrder = ({ nPedido, name, time, bairro, onClick, type }: Props) => {
  const typeButton = (): string => {
    if (type == 'APROVAR') {
      return 'Aprovar Pedido'
    } else if (type == 'CONCLUIR') {
      return 'Concluir Pedido'
    }
    return 'Finalizar Pedido'
  }

  return (
    <S.CardContainer>
      <S.DivPlus>
        <img src={lupa} alt="lupa" />
        <img src={more} alt="lupa" />
      </S.DivPlus>
      <S.DivContent>
        <S.NPedido>#{nPedido}</S.NPedido>
        <h2>{name}</h2>
      </S.DivContent>
      <S.DivContent2>
        <S.SpanTimeBairro>{time}</S.SpanTimeBairro>
        <S.SpanTimeBairro>{bairro}</S.SpanTimeBairro>
      </S.DivContent2>
      <S.Button type="button" onClick={onClick}>
        {typeButton()}
      </S.Button>
    </S.CardContainer>
  )
}

export default CardOrder

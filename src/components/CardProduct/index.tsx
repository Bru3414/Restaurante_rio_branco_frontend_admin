import { useEffect, useState } from 'react'
import { parseToBrl } from '../../utils'
import * as S from './styles'
import { Product } from '../../types'
import { useDeleteProductMutation } from '../../services/api'
import { useDispatch } from 'react-redux'
import { excluir } from '../../store/reducers/productPanel'

export interface Props extends Product {
  onClick: () => void
}

const CardProduct = ({
  name,
  img,
  description,
  price,
  id,
  isInMenu,
  category,
  onClick
}: Props) => {
  const [
    deletaProduto,
    { isSuccess: isSuccessDelete, isLoading: isLoadingDelete }
  ] = useDeleteProductMutation()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isSuccessDelete) {
      dispatch(excluir(id))
    }
  }, [isSuccessDelete])

  const textButton = (): string => {
    if (isInMenu) {
      return 'Ativo no Cardápio'
    }
    return 'Desativado no Cardápio'
  }

  return (
    <S.CardContainer>
      <S.Price>{parseToBrl(price)}</S.Price>
      <S.Category>{category.toUpperCase()}</S.Category>
      <S.CardHeader>
        <img src={img} />
        <h2>{name}</h2>
      </S.CardHeader>
      <p>{description}</p>
      <S.ButtonMenu>{textButton()}</S.ButtonMenu>
      <S.ButtonDiv>
        <S.ButtonSaveEdit onClick={onClick}>Editar</S.ButtonSaveEdit>
        <S.ButtonCancelarExcluir onClick={() => deletaProduto(id)}>
          Excluir
        </S.ButtonCancelarExcluir>
      </S.ButtonDiv>
    </S.CardContainer>
  )
}

export default CardProduct

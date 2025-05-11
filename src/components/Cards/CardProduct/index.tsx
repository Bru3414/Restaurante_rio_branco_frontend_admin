import { useEffect, useState } from 'react'
import { parseToBrl } from '../../../utils'
import * as S from './styles'
import { Product } from '../../../types'
import {
  useDeleteProductMutation,
  useUpdateProductMutation
} from '../../../services/api'
import { useDispatch } from 'react-redux'
import { excluir, update } from '../../../store/reducers/productPanel'
import ModalConfirmacao from '../../Modals/ModalConfirmacao'
import Button from '../../ReuseComponents/Button'

export interface Props extends Product {
  onClick: () => void
}

const CardProduct = ({
  name,
  image,
  description,
  price,
  id,
  isInMenu,
  category,
  onClick
}: Props) => {
  const [modalConfirmacao, setModalConfirmacao] = useState({
    isVisible: false,
    text: '',
    onClick: () => console.log()
  })
  const [
    deletaProduto,
    { isSuccess: isSuccessDelete, isLoading: isLoadingDelete }
  ] = useDeleteProductMutation()
  const [
    updateProduct,
    { isSuccess: isSuccessUpdate, isLoading: isLoadingUpdate }
  ] = useUpdateProductMutation()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isSuccessDelete) {
      dispatch(excluir(id))
    }
  }, [isSuccessDelete])

  useEffect(() => {
    if (isSuccessUpdate) {
      dispatch(
        update({
          category: category,
          description: description,
          id: id,
          image: image,
          isInMenu: !isInMenu,
          name: name,
          price: price
        })
      )
      setModalConfirmacao({
        isVisible: false,
        text: '',
        onClick: () => console.log
      })
    }
  }, [isSuccessUpdate])

  const textButton = (): string => {
    if (isInMenu) {
      return 'Ativo no Cardápio'
    }
    return 'Desativo no Cardápio'
  }

  return (
    <>
      <S.CardContainer>
        <S.Price>{parseToBrl(price)}</S.Price>
        <S.Category>{category}</S.Category>
        <S.CardHeader>
          <img src={image.url} />
          <h2>{name}</h2>
        </S.CardHeader>
        <p>{description}</p>
        <S.ButtonMenu
          isinmenu={isInMenu}
          onClick={() => {
            const text = isInMenu
              ? `Deseja DESATIVAR o item "${name.toUpperCase()}" do cardápio?`
              : `Deseja ATIVAR o item "${name.toUpperCase()}" no cardápio?`
            setModalConfirmacao({
              isVisible: true,
              text: text,
              onClick: () => {
                updateProduct({
                  category: category,
                  description: description,
                  id: id,
                  image: image,
                  isInMenu: !isInMenu,
                  name: name,
                  price: price
                })
              }
            })
          }}
        >
          {textButton()}
        </S.ButtonMenu>
        <S.ButtonDiv>
          <Button
            type="button"
            variant="CONFIRM"
            onClick={onClick}
            text="Editar"
          />
          <Button
            type="button"
            variant="CANCEL"
            text="Excluir"
            onClick={() =>
              setModalConfirmacao({
                isVisible: true,
                text: `Confirmar exclusão do produto: ${name.toUpperCase()}`,
                onClick: () => deletaProduto(id)
              })
            }
          />
        </S.ButtonDiv>
      </S.CardContainer>
      <ModalConfirmacao
        isVisible={modalConfirmacao.isVisible}
        onClickCancelar={() =>
          setModalConfirmacao({
            isVisible: false,
            text: '',
            onClick: () => console.log()
          })
        }
        text={modalConfirmacao.text}
        onClick={modalConfirmacao.onClick}
        disableButtons={isLoadingDelete || isLoadingUpdate}
      />
    </>
  )
}

export default CardProduct

import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ModalContainer from '../ModalContainer'
import { RootReducer } from '../../store'
import {
  buscarImagensProdutos,
  handleImage,
  createImage,
  deleteImage as deleteImageStore,
  handleImageSelected,
  updateImage
} from '../../store/reducers/imagePanel'
import {
  useDeleteImageProductMutation,
  useGetAllImagesProductsQuery,
  useGetAllProdutosQuery,
  useUploadImageProdutoMutation
} from '../../services/api'
import * as S from './styles'
import { useEffect, useState } from 'react'
import { ImageProductDB } from '../../types'
import ModalConfirmacao from '../ModalConfirmacao'
import {
  alteraImageDefaultProduto,
  buscarProdutos
} from '../../store/reducers/productPanel'
import Button from '../Button'
import lixeira from '../../assets/images/lixeira.png'

interface ModalState extends ImageProductDB {
  isVisible: boolean
}

type Props = {
  isVisible: boolean
  onClickCancelar: () => void
  onClickConfirmar: () => void
}

const ImagesProducts = ({
  isVisible,
  onClickCancelar,
  onClickConfirmar
}: Props) => {
  const [modalConfirmacao, setModalConfirmacao] = useState<ModalState>({
    id: 0,
    isVisible: false,
    name: '',
    url: ''
  })
  const [
    uploadImageProduto,
    {
      isLoading: isLoadingUpload,
      isSuccess: isSuccessUpload,
      isError: isErrorUpload,
      data: dataUpload
    }
  ] = useUploadImageProdutoMutation()
  const {
    data: imagesProducts,
    isSuccess: isSuccessGetImages,
    isLoading: isLoadingGetImages
  } = useGetAllImagesProductsQuery()
  const [
    deleteImage,
    {
      isSuccess: isSuccessDeleteImage,
      isLoading: isLoadingDeleteImage,
      isError: isErrorDeleteImage
    }
  ] = useDeleteImageProductMutation()
  const { file, name, url } = useSelector(
    (state: RootReducer) => state.imagePanel.image
  )
  const { items, imageSelected } = useSelector(
    (state: RootReducer) => state.imagePanel
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (imagesProducts) {
      dispatch(buscarImagensProdutos(imagesProducts))
    }
  }, [isSuccessGetImages])

  useEffect(() => {
    if (dataUpload) {
      if (items.some((item) => item.id === dataUpload.id)) {
        dispatch(
          updateImage({
            id: dataUpload.id,
            name: dataUpload.name,
            url: dataUpload.url
          })
        )
      } else {
        dispatch(
          createImage({
            id: dataUpload.id,
            name: dataUpload.name,
            url: dataUpload.url
          })
        )
      }
      dispatch(
        handleImage({
          url: url,
          name: ''
        })
      )
      dispatch(
        handleImageSelected({
          id: dataUpload.id,
          name: dataUpload.name,
          url: dataUpload.url
        })
      )
    }
  }, [isSuccessUpload])

  useEffect(() => {
    if (isErrorUpload) {
      alert('Algo deu errado, verifique o tipo do arquivo tente novamente')
    }
  }, [isErrorUpload])

  useEffect(() => {
    if (isSuccessDeleteImage) {
      dispatch(deleteImageStore(modalConfirmacao.id))
      dispatch(alteraImageDefaultProduto(modalConfirmacao.id))
      closeModalConfirmacao()
    }
  }, [isSuccessDeleteImage])

  const form = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      if (name !== undefined && file) {
        uploadImageProduto({
          file: file,
          data: name
        }).unwrap()
      }
    }
  })

  const handleImageProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      dispatch(
        handleImage({
          file: e.target.files[0],
          name: e.target.value.split('\\').pop(),
          url: ''
        })
      )
    }
  }

  const closeModalConfirmacao = () => {
    setModalConfirmacao({
      id: 0,
      isVisible: false,
      name: '',
      url: ''
    })
  }

  const trocaImgSelecionada = (id: number, name: string, url: string) => {
    if (imageSelected.id === id) {
      id = -1
      name = ''
      url = ''
    }
    dispatch(
      handleImageSelected({
        id: id,
        name: name,
        url: url
      })
    )
  }

  const renderizaImages = (): JSX.Element => {
    if (!imagesProducts) {
      return <S.ContainerImage>Carregando...</S.ContainerImage>
    }

    const filterItems = items.filter(
      (item) => item.name !== 'item_no_image.png'
    )

    if (filterItems.length >= 1) {
      return (
        <S.ContainerImage>
          {filterItems.map((item) => (
            <S.DivImage key={item.id}>
              <S.Image
                id={item.id.toString()}
                src={item.url}
                alt={item.name}
                onClick={() =>
                  trocaImgSelecionada(item.id, item.name, item.url)
                }
                className={imageSelected?.id === item.id ? 'selected' : ''}
              />
              <span
                onClick={() =>
                  setModalConfirmacao({
                    id: item.id,
                    name: item.name,
                    url: item.url,
                    isVisible: true
                  })
                }
              >
                <img src={lixeira} alt="lixeira icon" />
              </span>
            </S.DivImage>
          ))}
        </S.ContainerImage>
      )
    } else {
      return <>Nenhuma imagem encontrada</>
    }
  }

  return (
    <>
      <ModalContainer isVisible={isVisible}>
        <form onSubmit={form.handleSubmit}>
          <S.Buttons>
            <div>
              <label htmlFor="file">
                {name ? name : <span>Envie uma imagem</span>}
              </label>
              <input
                id="file"
                type="file"
                accept="image/*"
                onChange={handleImageProduct}
              />
            </div>
            <button disabled={name === '' || isLoadingUpload} type="submit">
              Adicionar Imagem
            </button>
          </S.Buttons>
          {renderizaImages()}
          <S.Buttons>
            <Button
              type="button"
              text="Confirmar"
              variant="CONFIRM"
              disable={isLoadingUpload || isLoadingDeleteImage}
              onClick={onClickConfirmar}
            />
            <Button
              type="button"
              text="Cancelar"
              variant="CANCEL"
              disable={isLoadingUpload || isLoadingDeleteImage}
              onClick={onClickCancelar}
            />
          </S.Buttons>
        </form>
      </ModalContainer>
      <ModalConfirmacao
        isVisible={modalConfirmacao.isVisible}
        text={`Confirmar exclusão da imagem: ${modalConfirmacao.name}`}
        onClick={() => deleteImage(modalConfirmacao.id)}
        disableButtons={isLoadingDeleteImage}
        onClickCancelar={() => closeModalConfirmacao()}
      />
    </>
  )
}

export default ImagesProducts

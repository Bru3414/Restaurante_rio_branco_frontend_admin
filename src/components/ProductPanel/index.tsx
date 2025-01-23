import CardProduct from '../CardProduct'
import * as S from './styles'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '../../store'
import {
  buscarProdutos,
  create,
  update
} from '../../store/reducers/productPanel'
import { ImageProductDB, Product } from '../../types'
import { Category } from '../../utils/enums/Product'
import PesquisaProdutos from '../PesquisaProdutos'
import {
  useCreateProductMutation,
  useGetAllProdutosQuery,
  useUpdateProductMutation
} from '../../services/api'
import ModalContainer from '../Modal'
import ImagesProducts from '../ImagesProducts'
import { handleImageSelected } from '../../store/reducers/imagePanel'
import Button from '../Button'

interface ModalState extends Product {
  isVisible: boolean
  type: 'updade' | 'create'
}

const ProductPanel = () => {
  const { data: produtosBD, isSuccess: isSuccessGetAll } =
    useGetAllProdutosQuery()
  const [
    cadastrarProduto,
    { isSuccess: isSuccessCreate, data: dataCreate, isLoading: isLoadingCreate }
  ] = useCreateProductMutation()
  const [
    atualizarProduto,
    {
      data: dataUpdate,
      isSuccess: isSuccessUpdate,
      isLoading: isLoadingUpdate,
      isError: isErrorUpdate
    }
  ] = useUpdateProductMutation()
  const [preview, setPreview] = useState<string | null>(null)
  const { items } = useSelector((state: RootReducer) => state.productPanel)
  const { termo } = useSelector((state: RootReducer) => state.pesquisaProduto)
  const { image, imageSelected } = useSelector(
    (state: RootReducer) => state.imagePanel
  )
  const dispatch = useDispatch()
  const [modalImageProduto, setModalImageProduto] = useState(false)
  const [modalProduto, setModalProduto] = useState<ModalState>({
    id: 0,
    name: '',
    description: '',
    price: 0,
    isInMenu: false,
    image: {
      id: -1,
      name: '',
      url: ''
    },
    isVisible: false,
    category: Category.MARMITA,
    type: 'create'
  })

  useEffect(() => {
    if (produtosBD) {
      dispatch(buscarProdutos(produtosBD))
    }
  }, [isSuccessGetAll])

  useEffect(() => {
    if (dataCreate) {
      dispatch(
        create({
          id: dataCreate.id,
          category: dataCreate.category,
          description: dataCreate.description,
          image: dataCreate.image,
          isInMenu: dataCreate.isInMenu,
          name: dataCreate.name,
          price: dataCreate.price
        })
      )
      closeModalProduto()
    }
  }, [isSuccessCreate])

  useEffect(() => {
    if (dataUpdate) {
      dispatch(
        update({
          id: dataUpdate.id,
          category: dataUpdate.category,
          description: dataUpdate.description,
          image: dataUpdate.image,
          isInMenu: dataUpdate.isInMenu,
          name: dataUpdate.name,
          price: dataUpdate.price
        })
      )
      closeModalProduto()
    }
  }, [isSuccessUpdate])

  useEffect(() => {
    if (isErrorUpdate) {
      alert('Erro ao atualizar produto')
    }
  }, [isErrorUpdate])

  const form = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: 0,
      category: Category.MARMITA
    },
    validationSchema: Yup.object({}),
    onSubmit: (values) => {
      if (modalProduto.type === 'create') {
        cadastrarProduto({
          name: values.name.toLowerCase().trim(),
          description: values.description.toLowerCase().trim(),
          image: modalProduto.image,
          category: values.category,
          price: values.price,
          isInMenu: modalProduto.isInMenu
        })
      } else {
        atualizarProduto({
          id: modalProduto.id,
          name: values.name.toLowerCase().trim(),
          category: values.category,
          description: values.description.toLowerCase().trim(),
          image: modalProduto.image,
          isInMenu: modalProduto.isInMenu,
          price: values.price
        })
      }
    }
  })

  const closeModalProduto = () => {
    setModalProduto({
      id: 0,
      name: '',
      description: '',
      price: 0,
      isInMenu: false,
      image: imageSelected,
      isVisible: false,
      category: Category.MARMITA,
      type: 'create'
    })
  }

  const openModalProduto = (
    id: number,
    image: ImageProductDB,
    isInMenu: boolean,
    name: string,
    description: string,
    price: number,
    category: Category,
    type: 'updade' | 'create'
  ) => {
    setModalProduto({
      id: id,
      image: image,
      description: description,
      isInMenu: isInMenu,
      name: name,
      price: price,
      isVisible: true,
      category: category,
      type: type
    })
    form.values.name = name
    form.values.description = description
    form.values.price = price
    form.values.category = category
  }

  const optionsSelect = (): JSX.Element => {
    const values = Object.values(Category)
    return (
      <select
        value={form.values.category}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        name="category"
        id="category"
      >
        {values.map((item) => (
          <option value={item} key={item}>
            {item.toUpperCase()}
          </option>
        ))}
      </select>
    )
  }

  const renderizaProdutos = (): JSX.Element => {
    if (!produtosBD) {
      return <>Carregando...</>
    }

    let produtos = items.filter(
      (item) => item.name.toLowerCase().search(termo.toLowerCase()) >= 0
    )

    produtos = produtos.sort((a, b) => a.id - b.id)

    if (produtos.length >= 1) {
      return (
        <>
          {produtos.map((item) => (
            <CardProduct
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              image={item.image}
              isInMenu={item.isInMenu}
              price={item.price}
              category={item.category}
              onClick={() => {
                dispatch(
                  handleImageSelected({
                    id: item.image.id,
                    name: item.image.name,
                    url: item.image.url
                  })
                )
                openModalProduto(
                  item.id,
                  item.image,
                  item.isInMenu,
                  item.name,
                  item.description,
                  item.price,
                  item.category,
                  'updade'
                )
              }}
            />
          ))}
        </>
      )
    } else {
      return <div>Nenhum produto encontrado</div>
    }
  }

  const renderizaModalProduto = (): JSX.Element => {
    return (
      <ModalContainer isVisible={modalProduto.isVisible}>
        <S.Form onSubmit={form.handleSubmit}>
          {isLoadingCreate || isLoadingUpdate ? (
            <>Carregando</>
          ) : (
            <>
              <S.ImgDiv>
                <h3>Imagem:</h3>
                <img
                  src={
                    modalProduto.image.id === -1
                      ? 'https://resriobranco-images.s3.sa-east-1.amazonaws.com/item_no_image/item_no_image.png'
                      : modalProduto.image.url
                  }
                  alt={modalProduto.image.name}
                />
              </S.ImgDiv>
              <S.LabelInput>
                <label htmlFor="">Imagem do Produto:</label>
                <S.ButtonImage
                  type="button"
                  onClick={() => {
                    dispatch(
                      handleImageSelected({
                        id: modalProduto.image.id,
                        name: modalProduto.image.name,
                        url: modalProduto.image.url
                      })
                    )
                    setModalImageProduto(true)
                  }}
                >
                  Alterar Imagem
                </S.ButtonImage>
              </S.LabelInput>
              <S.LabelInput>
                <label htmlFor="name">Nome do Produto:</label>
                <input
                  name="name"
                  id="name"
                  value={form.values.name}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  type="text"
                />
              </S.LabelInput>
              <S.LabelInput>
                <label htmlFor="description">Descrição:</label>
                <textarea
                  id="description"
                  name="description"
                  value={form.values.description}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
              </S.LabelInput>
              <S.LabelInput>
                <label htmlFor="price">Preço:</label>
                <input
                  id="price"
                  name="price"
                  value={form.values.price}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  type="text"
                />
              </S.LabelInput>
              <S.LabelInput>
                <label htmlFor="category">Categoria:</label>
                {optionsSelect()}
              </S.LabelInput>
              <S.LabelInput>
                <Button
                  type="submit"
                  text="Salvar"
                  variant="CONFIRM"
                  disable={isLoadingCreate || isLoadingUpdate}
                />
                <Button
                  text="Cancelar"
                  variant="CANCEL"
                  disable={isLoadingCreate || isLoadingUpdate}
                  type="button"
                  onClick={() => closeModalProduto()}
                />
              </S.LabelInput>
            </>
          )}
        </S.Form>
      </ModalContainer>
    )
  }

  return (
    <S.Div className="container">
      <S.TopBarDiv>
        <PesquisaProdutos />
        <button
          onClick={() => {
            dispatch(
              handleImageSelected({
                id: -1,
                name: '',
                url: ''
              })
            )
            openModalProduto(
              0,
              {
                id: -1,
                name: '',
                url: ''
              },
              false,
              '',
              '',
              0,
              Category.MARMITA,
              'create'
            )
          }}
        >
          adicionar produto
        </button>
      </S.TopBarDiv>
      <S.ProductPanelContainer>
        {renderizaProdutos()}
        {renderizaModalProduto()}
        <ImagesProducts
          onClickCancelar={() => {
            setModalImageProduto(false)
          }}
          isVisible={modalImageProduto}
          onClickConfirmar={() => {
            setModalProduto({
              category: modalProduto.category,
              description: modalProduto.description,
              id: modalProduto.id,
              image: imageSelected,
              isInMenu: modalProduto.isInMenu,
              isVisible: modalProduto.isVisible,
              name: modalProduto.name,
              price: modalProduto.price,
              type: modalProduto.type
            })
            setModalImageProduto(false)
          }}
        />
      </S.ProductPanelContainer>
    </S.Div>
  )
}

export default ProductPanel

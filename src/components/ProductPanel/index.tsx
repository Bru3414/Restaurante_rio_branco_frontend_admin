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
import { Product } from '../../types'
import { Category } from '../../utils/enums/Product'
import PesquisaProdutos from '../PesquisaProdutos'
import {
  useCreateProductMutation,
  useGetAllProdutosQuery,
  useUpdateProductMutation
} from '../../services/api'
import ModalContainer from '../Modal'
import ImagesProducts from '../ImagesProducts'

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
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const { items } = useSelector((state: RootReducer) => state.productPanel)
  const { termo } = useSelector((state: RootReducer) => state.pesquisaProduto)
  const dispatch = useDispatch()
  const [modalImageProduto, setModalImageProduto] = useState(false)
  const [modalProduto, setModalProduto] = useState<ModalState>({
    id: 0,
    name: '',
    description: '',
    price: 0,
    isInMenu: false,
    img: '',
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
          img: dataCreate.img,
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
          img: dataUpdate.img,
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
          name: values.name.trim(),
          description: values.description.trim(),
          img: '',
          category: values.category,
          price: values.price,
          isInMenu: modalProduto.isInMenu
        })
      } else {
        atualizarProduto({
          id: modalProduto.id,
          name: values.name,
          category: values.category,
          description: values.description,
          img: modalProduto.img,
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
      img: '',
      isVisible: false,
      category: Category.MARMITA,
      type: 'create'
    })
  }

  const openModalProduto = (
    id: number,
    img: string,
    isInMenu: boolean,
    name: string,
    description: string,
    price: number,
    category: Category,
    type: 'updade' | 'create'
  ) => {
    setModalProduto({
      id: id,
      img: img,
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
    setPreview(img)
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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setImage(file) // Armazena o arquivo no estado
      const previewURL = URL.createObjectURL(file) // Gera uma URL temporária para pré-visualizar
      setPreview(previewURL)
    }
    console.log(event.target.value.split('\\').pop())
  }

  const renderizaProdutos = (): JSX.Element => {
    if (!produtosBD) {
      return <>Carregando...</>
    }

    const produtos = items.filter(
      (item) => item.name.toLowerCase().search(termo.toLowerCase()) >= 0
    )

    if (produtos.length >= 1) {
      return (
        <>
          {produtos.map((item) => (
            <CardProduct
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              img={item.img}
              isInMenu={item.isInMenu}
              price={item.price}
              category={item.category}
              onClick={() =>
                openModalProduto(
                  item.id,
                  item.img,
                  item.isInMenu,
                  item.name,
                  item.description,
                  item.price,
                  item.category,
                  'updade'
                )
              }
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
              {preview ? (
                <S.ImgDiv>
                  <h3>Pré-visualização:</h3>
                  <img src={preview} alt="Preview" />
                </S.ImgDiv>
              ) : (
                <div></div>
              )}
              <S.LabelInput>
                <label htmlFor="">Imagem do Produto:</label>
                <button
                  type="button"
                  onClick={() => setModalImageProduto(true)}
                >
                  Alterar Imagem
                </button>
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
                <button type="submit" className="btn-salvar">
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={() => closeModalProduto()}
                  className="btn-cancelar"
                >
                  Cancelar
                </button>
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
            openModalProduto(
              0,
              '',
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
          onClickCancelar={() => setModalImageProduto(false)}
          isDisable={false}
          isVisible={modalImageProduto}
        />
      </S.ProductPanelContainer>
    </S.Div>
  )
}

export default ProductPanel

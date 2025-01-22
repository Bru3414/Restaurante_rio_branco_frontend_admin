import { useDispatch, useSelector } from 'react-redux'
import ModalContainer from '../Modal'
import { RootReducer } from '../../store'
import { handleImage } from '../../store/reducers/imagePanel'
import { useUploadImageProdutoMutation } from '../../services/api'

type Props = {
  isVisible: boolean
  isDisable: boolean
  onClickCancelar: () => void
}

const ImagesProducts = ({ isVisible, isDisable, onClickCancelar }: Props) => {
  const [uploadImageProduto, { isLoading, isSuccess, isError }] =
    useUploadImageProdutoMutation()
  const { file, name, url } = useSelector(
    (state: RootReducer) => state.imagePanel
  )
  const dispatch = useDispatch()

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

  return (
    <ModalContainer isVisible={isVisible}>
      <div>
        <div>
          <input type="file" accept="image/*" onChange={handleImageProduct} />
          <button disabled={isDisable}>Adicionar Imagem</button>
        </div>
        <div>
          <img src="" alt="" />
        </div>
        <div>
          <button
            onClick={() => {
              if (name !== undefined && file) {
                uploadImageProduto({
                  file: file,
                  data: name
                }).unwrap()
              }
            }}
          >
            Confirmar
          </button>
          <button onClick={onClickCancelar}>Cancelar</button>
        </div>
      </div>
    </ModalContainer>
  )
}

export default ImagesProducts

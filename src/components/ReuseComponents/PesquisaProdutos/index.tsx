import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '../../../store'
import { alterarTermo } from '../../../store/reducers/pesquisaProduto'
import * as S from './styles'

const PesquisaProdutos = () => {
  const { termo } = useSelector((state: RootReducer) => state.pesquisaProduto)
  const dispatch = useDispatch()

  return (
    <S.Pesquisar>
      <input
        type="text"
        placeholder="Pesquisar"
        value={termo}
        onChange={(e) => dispatch(alterarTermo(e.target.value))}
      />
    </S.Pesquisar>
  )
}

export default PesquisaProdutos

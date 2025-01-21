import * as S from './styles'

const BarraLateral = () => {
  return (
    <S.AsideContainer>
      <S.List>
        <S.ListItem to={`/`}>Pedidos</S.ListItem>
        <S.ListItem to={`/produtos`}>Produtos</S.ListItem>
        <S.ListItem to={`/`}>Registros</S.ListItem>
      </S.List>
    </S.AsideContainer>
  )
}

export default BarraLateral

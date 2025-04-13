import Button from '../Button'
import ModalContainer from '../ModalContainer'

import * as S from './styles'

type Props = {
  isVisible: boolean
  text: string
  onClick: () => void
  onClickCancelar: () => void
  disableButtons: boolean
}

const ModalConfirmacao = ({
  isVisible,
  text,
  onClick,
  onClickCancelar,
  disableButtons
}: Props) => {
  return (
    <ModalContainer isVisible={isVisible}>
      <S.Div>
        <h2>atenção</h2>
        <p>{text}</p>
        <S.DivButton>
          <Button
            type="button"
            disable={disableButtons}
            onClick={onClick}
            text="Confirmar"
            variant="CONFIRM"
          />
          <Button
            type="button"
            disable={disableButtons}
            onClick={onClickCancelar}
            text="Cancelar"
            variant="CANCEL"
          />
        </S.DivButton>
      </S.Div>
    </ModalContainer>
  )
}

export default ModalConfirmacao

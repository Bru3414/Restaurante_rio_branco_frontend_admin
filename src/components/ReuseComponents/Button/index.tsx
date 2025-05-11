import * as S from './styles'

export type Props = {
  text: string
  onClick?: () => void
  variant: 'CONFIRM' | 'CANCEL'
  disable?: boolean
  type: string
}

const Button = ({
  text,
  onClick,
  variant,
  disable,
  type = 'button'
}: Props) => {
  return (
    <S.Button
      type={type}
      disabled={disable}
      variant={variant}
      onClick={onClick}
    >
      {text}
    </S.Button>
  )
}

export default Button

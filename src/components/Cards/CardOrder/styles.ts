import styled from 'styled-components'
import { colors } from '../../../styles'

type Props = {
  colorButton:
    | 'AGUARDANDO_APROVACAO'
    | 'PRODUCAO'
    | 'PRONTO'
    | 'FINALIZADO'
    | 'CANCELADO'
}

export const CardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 8px;
  border: 1px solid #000;
  border-radius: 8px;
  background-color: ${colors.white};
`

export const DivContent = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 2px solid #000;
`

export const DivContent2 = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;

  :first-child {
    border-right: 2px solid #000;
  }
`
export const DivPlus = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;

  img {
    margin-right: 4px;
    height: 30px;
    cursor: pointer;
  }
`

export const NPedido = styled.span`
  font-size: 24px;
  font-weight: bold;
  margin-right: 8px;
`
export const SpanTimeBairro = styled.span`
  font-size: 18px;
  padding: 0 4px;
`
export const Button = styled.button<Props>`
  outline: none;
  border: none;
  padding: 8px;
  margin: 8px 0;
  cursor: pointer;
  font-size: 24px;
  border-radius: 8px;
  background-color: ${(props) => {
    switch (props.colorButton) {
      case 'AGUARDANDO_APROVACAO':
        return '#ffeaa7'
      case 'PRODUCAO':
        return '#00cec9'
      case 'PRONTO':
        return '#74b9ff'
      default:
        return 'gray'
    }
  }};
`

export const TotalValueDiv = styled.div`
  display: flex;
  justify-content: space-between;
`
export const Dotted = styled.span`
  display: flex;
  width: 100%;
  border-top: 3px dotted black;
  margin: 8px 0 4px;
`

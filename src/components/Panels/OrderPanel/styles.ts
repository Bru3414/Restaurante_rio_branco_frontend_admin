import styled from 'styled-components'
import { colors } from '../../../styles'

export const OrderContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 24px;
`
export const OrderDiv = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${colors.white};
  height: 80vh;
  overflow-y: auto;
  padding: 16px;
  row-gap: 24px;
  border-radius: 8px;
  background-color: ${colors.black};

  h1 {
    display: flex;
    justify-content: center;
    border-bottom: 1px solid ${colors.white};
    border-radius: 8px;
    color: ${colors.white};
  }
`

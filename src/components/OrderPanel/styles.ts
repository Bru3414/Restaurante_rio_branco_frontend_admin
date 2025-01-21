import styled from 'styled-components'

export const OrderContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 24px;
`
export const OrderDiv = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #000;
  height: 80vh;
  overflow-y: auto;
  padding: 16px;
  row-gap: 24px;
`

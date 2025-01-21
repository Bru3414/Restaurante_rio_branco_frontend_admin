import styled from 'styled-components'

export const CardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 8px;
  border: 1px solid #000;
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
export const Button = styled.button`
  outline: none;
  border: none;
  padding: 8px;
  margin-top: 8px;
  cursor: pointer;
  font-size: 24px;
`

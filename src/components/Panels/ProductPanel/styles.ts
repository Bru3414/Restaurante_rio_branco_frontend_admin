import styled from 'styled-components'
import { colors } from '../../../styles'

export const Div = styled.div`
  padding: 24px;
  border: 1px solid #000;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 36px;
  max-height: 80vh;
  border-radius: 8px;
  background-color: ${colors.black};
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 24px;
`

export const TopBarDiv = styled.div`
  display: flex;
  gap: 24px;

  button {
    text-transform: uppercase;
    padding: 8px;
    font-size: 20px;
    cursor: pointer;
    border-radius: 8px;
  }
`

export const ProductPanelContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 36px;
`
export const ImgDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 150px;
    height: 150px;
    padding: 8px;
    border: 1px solid #000;
    object-fit: cover;
  }
`

export const LabelInput = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  align-items: center;
  column-gap: 8px;

  select {
    border: 1px solid #000;
    background-color: #fff;
    outline: none;
    padding: 8px;
    font-size: 20px;
  }

  label {
    font-size: 24px;
  }

  input {
    border: 1px solid #000;
    background-color: #fff;
    outline: none;
    padding: 8px;
    font-size: 20px;

    &[type='file'] {
      cursor: pointer;
    }
  }

  textarea {
    border: 1px solid #000;
    background-color: #fff;
    outline: none;
    padding: 8px;
    font-size: 20px;
    resize: none;
  }
`
export const ButtonImage = styled.button`
  padding: 8px;
  font-size: 20px;
  border: 1px solid #000;
  outline: none;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    background-color: gray;
  }
`

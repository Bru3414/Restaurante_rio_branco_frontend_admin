import styled from 'styled-components'

export const Div = styled.div`
  padding: 24px;
  border: 1px solid #000;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 36px;
  max-height: 80vh;
`

export const TopBarDiv = styled.div`
  display: flex;
  gap: 24px;

  button {
    text-transform: uppercase;
    padding: 8px;
    font-size: 20px;
    cursor: pointer;
  }
`

export const ProductPanelContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 36px;
`
export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  align-items: center;
  justify-content: center;
  display: none;

  &.visible {
    display: flex;
  }

  .overlay {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.73);
  }
`
export const ModalContent = styled.form`
  max-width: 960px;
  position: relative;
  z-index: 1;
  background-color: #fff;
  border: 1px solid #000;
  padding: 24px;
  display: flex;
  flex-direction: column;
  row-gap: 24px;
`
export const ImgDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    height: 150px;
    padding: 8px;
    border: 1px solid #000;
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

  button {
    padding: 8px;
    font-size: 20px;
    border: 1px solid #000;
    outline: none;
    cursor: pointer;

    &.btn-cancelar {
      background-color: rgb(216, 69, 69);

      &:hover {
        background-color: rgb(192, 12, 12);
      }
    }

    &.btn-salvar {
      background-color: #a7e09c;

      &:hover {
        background-color: #31dd57;
      }
    }
  }
`

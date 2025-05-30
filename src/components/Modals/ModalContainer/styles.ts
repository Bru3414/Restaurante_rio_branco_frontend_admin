import { styled } from 'styled-components'

const Modal = styled.div`
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

type Props = {
  isBackTransparent: boolean
}

export const ModalContent = styled.div<Props>`
  max-width: 960px;
  min-width: 700px;
  position: relative;
  z-index: 1;

  ${(props) =>
    props.isBackTransparent
      ? 'background-color: transparent; display: flex; justify-content: center;'
      : 'background-color: #fff; border: 1px solid #000;'}
  padding: 24px;
`

export default Modal

import Modal, { ModalContent } from './styles'

type Props = {
  children: JSX.Element
  isVisible: boolean
  onClick?: VoidFunction
  isBackTransparent?: boolean
}

const ModalContainer = ({
  children,
  isVisible,
  onClick,
  isBackTransparent = false
}: Props) => {
  return (
    <Modal className={isVisible ? 'visible' : ''}>
      <ModalContent isBackTransparent={isBackTransparent}>
        {children}
      </ModalContent>
      <div className="overlay" onClick={onClick}></div>
    </Modal>
  )
}

export default ModalContainer

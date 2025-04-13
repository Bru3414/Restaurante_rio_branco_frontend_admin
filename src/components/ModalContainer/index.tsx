import Modal, { ModalContent } from './styles'

type Props = {
  children: JSX.Element
  isVisible: boolean
  onClick?: VoidFunction
}

const ModalContainer = ({ children, isVisible, onClick }: Props) => {
  return (
    <Modal className={isVisible ? 'visible' : ''}>
      <ModalContent>{children}</ModalContent>
      <div className="overlay" onClick={onClick}></div>
    </Modal>
  )
}

export default ModalContainer

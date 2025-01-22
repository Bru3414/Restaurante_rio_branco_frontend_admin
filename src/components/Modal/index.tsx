import Modal, { ModalContent } from './styles'

type Props = {
  children: JSX.Element
  isVisible: boolean
}

const ModalContainer = ({ children, isVisible }: Props) => {
  return (
    <Modal className={isVisible ? 'visible' : ''}>
      <ModalContent>{children}</ModalContent>
      <div className="overlay"></div>
    </Modal>
  )
}

export default ModalContainer

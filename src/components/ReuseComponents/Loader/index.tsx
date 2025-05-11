import { PuffLoader } from 'react-spinners'
import ModalContainer from '../../Modals/ModalContainer'

type Props = {
  isVisible: boolean
}

const Loader = ({ isVisible }: Props) => {
  return (
    <ModalContainer isVisible={isVisible} isBackTransparent={true}>
      <PuffLoader color="#fff" size={120} />
    </ModalContainer>
  )
}

export default Loader

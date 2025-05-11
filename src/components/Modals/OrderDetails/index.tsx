import { Order } from '../../../types'
import ModalContainer from '../ModalContainer'

type Props = {
  order: Order
  isVisible: boolean
  onClick: VoidFunction
}

const OrderDetails = ({ order, isVisible, onClick }: Props) => {
  return (
    <ModalContainer isVisible={isVisible} onClick={onClick}>
      <div>
        <p>{order.customer_name}</p>
      </div>
    </ModalContainer>
  )
}

export default OrderDetails

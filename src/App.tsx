import React, { useEffect, useState } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import OrderPanel from './components/OrderPanel'
import GlobalCss, { Container } from './styles'
import { RootReducer, store } from './store'
import BarraLateral from './components/SideBar'
import { BrowserRouter } from 'react-router-dom'
import Rotas from './routes'
import useWebSocket from './services/webSocket'
import { useGetOrdersForOrdersPanelApiQuery } from './services/api'
import { atualizaOrders } from './store/reducers/orderPanel'
import NotificationManager from './components/NotificationManager'

function App() {
  const {
    data: orders,
    isSuccess: isSuccessGetOrders,
    isLoading: isLoadingGetOrders,
    refetch: refetchGetOrders
  } = useGetOrdersForOrdersPanelApiQuery()
  const { items } = useSelector((state: RootReducer) => state.orderPanel)
  const dispatch = useDispatch()
  // Esta assim apenas para desenvolvimento
  // Quando eu trabalhar na parte de adiministradores, isso sera ajustado
  const token =
    'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJicnVubzM0MTQuZGFtYnJvc2tpQGdtYWlsLmNvbSIsImlhdCI6MTc0NDQ4NDA0OSwiZXhwIjoxNzQ1MDg4ODQ5fQ.578onyxPfo9vkjFHshhEJRfSPDU9I8p3WZLfRraPHzcuaTzlXAh2au1Ly2Bi7lbH2jmR2D8mq-jmh9AxkBbLsw'
  const [playSound, setPlaySound] = useState(false)

  useEffect(() => {
    if (isSuccessGetOrders) {
      dispatch(atualizaOrders(orders))
    }
  }, [isSuccessGetOrders, orders])

  useWebSocket({
    token,
    onMessage: (pedido) => {
      console.log('📦 Nova mensagem recebida:', pedido)
      if (pedido.startsWith('Novo pedido')) {
        setPlaySound(true)
      }
      refetchGetOrders().then(() => {
        console.log('🔄 Refetch concluído')
      })
    }
  })

  useEffect(() => {
    if (playSound) {
      const timeout = setTimeout(() => setPlaySound(false), 1000)
      return () => clearTimeout(timeout)
    }
  }, [playSound])

  return (
    <>
      <GlobalCss />
      <Container>
        <BrowserRouter>
          <BarraLateral />
          <Rotas />
        </BrowserRouter>
      </Container>
      <NotificationManager playSound={playSound} />
    </>
  )
}

export default App

import React from 'react'
import { Provider } from 'react-redux'
import OrderPanel from './components/OrderPanel'
import GlobalCss, { Container } from './styles'
import { store } from './store'
import BarraLateral from './components/SideBar'
import { BrowserRouter } from 'react-router-dom'
import Rotas from './routes'
import useWebSocket from './services/webSocket'

function App() {
  const token =
    'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJicnVubzM0MTQuZGFtYnJvc2tpQGdtYWlsLmNvbSIsImlhdCI6MTc0NDQ4NDA0OSwiZXhwIjoxNzQ1MDg4ODQ5fQ.578onyxPfo9vkjFHshhEJRfSPDU9I8p3WZLfRraPHzcuaTzlXAh2au1Ly2Bi7lbH2jmR2D8mq-jmh9AxkBbLsw'

  useWebSocket({
    token,
    onMessage: (pedido) => {
      console.log('Novo pedido recebido:', pedido)
      alert('Novo pedido')
    }
  })

  return (
    <Provider store={store}>
      <GlobalCss />
      <Container>
        <BrowserRouter>
          <BarraLateral />
          <Rotas />
        </BrowserRouter>
      </Container>
    </Provider>
  )
}

export default App

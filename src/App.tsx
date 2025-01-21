import React from 'react'
import { Provider } from 'react-redux'
import OrderPanel from './components/OrderPanel'
import GlobalCss, { Container } from './styles'
import { store } from './store'
import BarraLateral from './components/SideBar'
import { BrowserRouter } from 'react-router-dom'
import Rotas from './routes'

function App() {
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

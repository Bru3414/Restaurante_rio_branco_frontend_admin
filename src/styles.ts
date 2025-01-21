import styled, { createGlobalStyle } from 'styled-components'

const GlobalCss = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Istok Web", serif;
    list-style: none;
  }

  .container {
    max-width: 1360px;
    width: 100%;
    margin: 0 auto;
  }
`

export const Container = styled.div`
  display: grid;
  grid-template-columns: 15vw auto;
  align-items: center;
`

export default GlobalCss

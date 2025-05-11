import styled, { createGlobalStyle } from 'styled-components'

export const colors = {
  black: '#222f3e',
  white: '#D9D9D9',
  gray: '#8395A7',
  green: 'green',
  red: 'red',
  blue: 'aqua'
}

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

  body {
    background-color: ${colors.gray};
  }
`

export const Container = styled.div`
  display: grid;
  grid-template-columns: 15vw auto;
  align-items: center;
`

export default GlobalCss

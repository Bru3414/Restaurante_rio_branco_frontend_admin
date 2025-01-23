import styled from 'styled-components'

type Props = {
  isinmenu: boolean
}

export const CardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid #000;
  padding: 8px;

  h2 {
    text-transform: uppercase;
    font-size: 20px;
  }

  p {
    margin: 8px 0;
    font-size: 20px;
    height: 80px;
    overflow-y: auto;
    text-transform: capitalize;
  }
`
export const Price = styled.span`
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 16px;
  font-weight: bold;
  align-items: center;
  color: #000;
  border-radius: 8px;
  text-align: center;
  padding: 4px;
  cursor: default;
  border: 1px solid #000;
  background-color: #fff;
`
export const Category = styled.span`
  position: absolute;
  color: #000;
  top: 8px;
  left: 8px;
  font-weight: bold;
  font-size: 16px;
  background-color: #fff;
  border-radius: 8px;
  text-align: center;
  padding: 4px;
  cursor: default;
  border: 1px solid #000;
`

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  column-gap: 16px;
  border-bottom: 1px solid #000;
  img {
    width: 100px;
    height: 100px;
    padding: 8px;
    object-fit: cover;
  }
`
export const ButtonMenu = styled.button<Props>`
  padding: 8px;
  outline: none;
  border: none;
  cursor: pointer;
  background-color: ${(props) =>
    props.isinmenu ? 'rgb(231, 229, 110)' : 'rgb(158, 158, 134)'};
  font-size: 20px;
  text-transform: uppercase;

  &:hover {
    background-color: ${(props) =>
      props.isinmenu ? 'rgb(203, 230, 56)' : 'rgb(87, 87, 79)'};
  }
`
export const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`

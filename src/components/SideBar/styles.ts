import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { colors } from '../../styles'

export const AsideContainer = styled.aside`
  display: flex;
  height: 100vh;
  border-right: 2px solid #000;
  padding: 16px;
  background-color: ${colors.black};
`
export const List = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: 24px;
`
export const ListItem = styled(Link)`
  text-decoration: none;
  color: #000;
  font-size: 2em;
  text-align: center;
  border: 1px solid #000;
  cursor: pointer;
  border-radius: 8px;
  background-color: ${colors.white};
`

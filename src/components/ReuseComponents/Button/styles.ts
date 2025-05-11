import { styled } from 'styled-components'
import { Props } from '.'

export const Button = styled.button<Omit<Props, 'onClick' | 'text'>>`
  padding: 8px;
  outline: none;
  border: none;
  cursor: pointer;
  background-color: ${(props) =>
    props.variant === 'CONFIRM' ? '#a7e09c' : 'rgb(216, 69, 69)'};
  border: 4px solid transparent;
  font-size: 20px;
  text-transform: uppercase;

  &:hover {
    background-color: ${(props) =>
      props.variant === 'CONFIRM' ? '#31dd57' : 'rgb(192, 12, 12)'};
    box-shadow: 0 0 10px
      ${(props) =>
        props.variant === 'CONFIRM' ? '#31dd57' : 'rgb(192, 12, 12)'};
    border: 4px solid
      ${(props) =>
        props.variant === 'CONFIRM' ? '#31dd57' : 'rgb(192, 12, 12)'};
  }

  &:disabled {
    &:hover {
      background-color: ${(props) =>
        props.variant === 'CONFIRM' ? '#a7e09c' : 'rgb(216, 69, 69)'};
      box-shadow: none;
      border: 4px solid transparent;
    }
  }
`

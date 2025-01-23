import { styled } from 'styled-components'
import { Props } from '.'

export const Button = styled.button<Omit<Props, 'onClick' | 'text'>>`
  padding: 8px;
  outline: none;
  border: none;
  cursor: pointer;
  background-color: ${(props) =>
    props.variant === 'CONFIRM' ? '#a7e09c' : 'rgb(216, 69, 69)'};
  font-size: 20px;
  text-transform: uppercase;

  &:hover {
    background-color: ${(props) =>
      props.variant === 'CONFIRM' ? '#31dd57' : 'rgb(192, 12, 12)'};
  }

  &:disabled {
    &:hover {
      background-color: ${(props) =>
        props.variant === 'CONFIRM' ? '#a7e09c' : 'rgb(216, 69, 69)'};
    }
  }
`

import styled from 'styled-components'
import { colors } from '../../../styles'

type Props = {
  backColor:
    | 'AGUARDANDO_APROVACAO'
    | 'PRODUCAO'
    | 'PRONTO'
    | 'FINALIZADO'
    | 'CANCELADO'
}

export const Row = styled.tr<Props>`
  background-color: ${(props) => {
    switch (props.backColor) {
      case 'AGUARDANDO_APROVACAO':
        return '#FFA500'
      case 'PRODUCAO':
        return '#3399FF'
      case 'PRONTO':
        return '#9B59B6'
      case 'FINALIZADO':
        return '#2ECC71'
      case 'CANCELADO':
        return '#E74C3C'
    }
  }};
`

export const Tabela = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px auto;

  thead {
    background-color: ${colors.black};
    color: ${colors.white};
  }

  th,
  td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
  }

  tr:hover {
    filter: brightness(1.3);
  }
`
export const IntupsContainer = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px;
  background-color: ${colors.black};
  align-items: center;
  border-radius: 8px;

  input[type='text'],
  input[type='date'],
  select {
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 14px;
    min-width: 160px;
    transition: border-color 0.3s;
  }

  input:focus,
  select:focus {
    border-color: #007bff;
    outline: none;
  }

  button {
    padding: 8px 14px;
    font-size: 14px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .filtro-container button:hover {
    opacity: 0.9;
  }
`
export const BtnFilter = styled.button`
  background-color: #007bff;
  color: white;
`

export const BtnLimpar = styled.button`
  background-color: #6c757d;
  color: white;
`

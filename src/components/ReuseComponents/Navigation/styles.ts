import styled from 'styled-components'

export const DivContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 20px;
  justify-content: center;

  .current-page {
    background-color: #1976d2;
    color: #fff;
  }
`
export const ButtonPage = styled.button`
  padding: 6px 12px;
  background-color: #e0e0e0;
  color: #000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.4em;
`
export const ButtonPrevNext = styled.button`
  padding: 6px 12px;
  background-color: #1976d2;
  color: #000;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: rgb(24, 92, 160);
  }

  &:disabled {
    opacity: 0.3;
    background-color: rgb(139, 135, 135);
    cursor: default;
  }
`

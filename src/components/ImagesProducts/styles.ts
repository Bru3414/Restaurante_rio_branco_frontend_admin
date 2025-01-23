import styled from 'styled-components'

export const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 24px;

  button {
    text-transform: uppercase;
    padding: 8px;
    font-size: 20px;
    cursor: pointer;

    &:disabled {
      cursor: default;
    }
  }

  label {
    padding: 8px;
    border: 2px solid #000;
    cursor: pointer;
    font-size: 20px;

    &:hover {
      border: 2px solid rgb(69, 177, 118);
      color: rgb(69, 177, 118);
    }
  }

  input[type='file' i] {
    display: none;
  }
`

export const DivImage = styled.div`
  position: relative;
`

export const ContainerImage = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-items: center;
  gap: 20px;
  padding: 8px 0;
  margin: 8px 0;
  max-height: 50vh;
  overflow-y: auto;
  overflow-x: hidden;

  img {
    width: 120px;
    height: 120px;
    cursor: pointer;
    object-fit: cover;
  }

  span {
    position: absolute;
    top: 4px;
    right: 4px;
    background-color: red;
    padding: 8px;
    cursor: pointer;
  }

  .selected {
    padding: 4px;
    border: 4px solid rgb(69, 177, 118);
    cursor: default;
  }
`

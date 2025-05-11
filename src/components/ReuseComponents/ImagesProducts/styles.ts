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
      box-shadow: 0 0 10px rgb(69, 177, 118);
    }
  }

  input[type='file' i] {
    display: none;
  }
`

export const DivImage = styled.div`
  position: relative;

  &:hover {
    span {
      display: flex;
    }
  }
`

export const Image = styled.img`
  width: 120px;
  height: 120px;
  cursor: pointer;
  object-fit: cover;
  border: 4px solid transparent;
  padding: 2px;
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

  span {
    text-align: center;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 6px;
    right: 6px;
    background-color: #fff;
    padding: 1px;
    cursor: pointer;
    display: none;
    border-radius: 50%;
    border: 1px solid #000;
    img {
      width: 30px;
      height: 30px;
    }

    &:hover {
      border: 1px solid red;
      box-shadow: 0 0 4px red;
    }
  }

  .selected {
    box-shadow: 0 0 10px rgb(69, 177, 118);
    /* padding: 4px;
    border: 4px solid rgb(69, 177, 118); */
    cursor: default;
    border: 4px solid rgb(69, 177, 118);
  }
`

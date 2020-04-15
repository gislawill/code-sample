import styled from "styled-components" 

export const BackButton = styled.button`
  position: relative;
  top: 10px;
  left: 10px;
  z-index: 1000;
`;

export const IconButton = styled.button`
  margin-left: 20px;
  border: none;
  background-color: transparent;
  svg {
    transform: scale(1.25)
  }
`;

export const MeterContainer = styled.div`
  position: absolute;
  bottom: 30px;
  right: 20px;
  z-index: 1000;
`

export const IconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`
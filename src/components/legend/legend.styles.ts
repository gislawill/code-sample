import styled from "styled-components" 

export const LegendContainer = styled.div`
  background-color: white;
  border-radius: 3px;
  bottom: 20px;
  box-shadow: 2px 2px 10px 0px rgba(0,0,0,0.3);
  font-family: 'Open Sans', sans-serif;
  min-width: 550px;
  padding: 15px 30px 30px;
  position: fixed;
  overflow: scroll;
  right: 20px;
  top: 20px;
  width: 33%;
  z-index: 1000;
  h1 {
    font-weight: 700;
    font-size: 2rem; 
  }
  h2 {
    font-weight: 700;
    font-size: 1.75rem;
  }
  h4 {
    font-weight: 400;
    line-height: 1.25rem;
    margin: 1rem 0;
  }
  h3 {
    margin-bottom: 0;
    font-weight: 700;
    font-size: 1.25rem;
  }
  p {
    margin-bottom: 0.75rem;
  }
`

export const Navigation = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const NavigationButton = styled.button`
  border: none;
  background: none;
  font-family: 'Open Sans', sans-serif;
  cursor: pointer;
`

export const MeterContainer = styled.div`

`
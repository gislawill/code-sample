import styled from "styled-components" 

export const LegendContainer = styled.div`
  background-color: white;
  font-family: 'Open Sans', sans-serif;
  padding: 30px 10%;
  margin-top: 600px;
  position: relative;
  z-index: 1000;
  @media (min-width: 991px) {
    box-shadow: 2px 2px 10px 0px rgba(0,0,0,0.3);
    min-width: 550px;
    padding: 30px 30px 0px;
    position: fixed;
    border-radius: 3px;
    bottom: 20px;
    margin-top: 0;
    top: 20px;
    right: 20px;
    width: 33%;
    overflow: scroll;
  }
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

export const NavigationButton = styled.button`
  border: none;
  background: none;
  font-family: 'Open Sans', sans-serif;
  cursor: pointer;
`

export const MeterContainer = styled.div`

`
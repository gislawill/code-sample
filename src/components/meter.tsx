import * as React from 'react';
import styled from 'styled-components'

import { IGriddedDataset, RCP, Period, Percentile } from '../lib/types'

const MeterContainer = styled.div`
  display: flex;
  position: relative;
  width: 340px;
  justify-content: flex-start;
  margin-bottom: 10px;
  margin-left: -100px;
`

const ButtonContainer = styled.div<{ color?: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 100px;
  min-width: 50px;
  min-height: 52px;
  color: ${p => p.color ? p.color : '#4A5CB5'};
  font-family: 'Open Sans', sans-serif;
  font-size: .85rem;
`

const Button = styled.button<{ active: boolean, color?: string }>`
  width: ${p => p.active ? '26px' : '20px'};
  height: ${p => p.active ? '26px' : '20px'};
  border-width: ${p => p.active ? '4px' : '0'};;
  border-radius: 100%;
  border-color: ${p => p.color ? p.color : '#4A5CB5'};
  background-color: ${p => p.active ? 'transparent' : (p.color ? p.color : '#4A5CB5')};
  transition: all .2s ease;
  &:hover {
    cursor: pointer;
  }
`

const Connector = styled.div<{ active: boolean, color?: string }>`
  position: absolute;
  background: ${p => p.color ? p.color : '#4A5CB5'};
  height: 4px;
  width: ${p => p.active ? '132px' : '130px'};
  top: 65%;
  right: ${p => p.active ? '-120px' : '-115px'};
  transition: all .2s ease;
`

type Option = Period | RCP | Percentile

interface IOption {
  display: string
  value: Option
}

interface IMeterProps {
  options: IOption[]
  selectOption: React.Dispatch<React.SetStateAction<any>> // sorry future will
  selectedOption: Option
  color?: string
}

export const Meter: React.FC<IMeterProps> = props => {
  const { options, selectOption, selectedOption, color } = props
  return (
    <MeterContainer>
      {options.map((option, i, options) => (
        <React.Fragment key={option.value}>
          <ButtonContainer color={color}>
            {option.display}
            <Button 
              active={option.value === selectedOption} 
              onClick={() => { selectOption(option.value) }}
              color={color}
              key={`button_${option.value}`}
            />
            {i < options.length - 1 && (
              <Connector 
                active={option.value === selectedOption} 
                color={color}
                key={`connector_${option.value}`} 
              />
            )}
          </ButtonContainer>
        </React.Fragment>
      ))}
    </MeterContainer>
  )
};

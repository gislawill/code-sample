import React from 'react'
import { Meter } from '../meter'
import { LegendContainer, MeterContainer } from './legend.styles'
import { Distribution } from '../distribution'
import { RCP, Period, Percentile, IGriddedDataset, IGriddedForcast } from '../../lib/types'

interface ILegendProps {
  variable: string
  setVariable: React.Dispatch<React.SetStateAction<string>>
  period: Period
  setPeriod: React.Dispatch<React.SetStateAction<Period>>
  rcp: RCP
  setRcp: React.Dispatch<React.SetStateAction<RCP>>
  percentile: Percentile
  setRercentile: React.Dispatch<React.SetStateAction<Percentile>>
  layer?: IGriddedDataset
  forecastSummary: IGriddedForcast
}

function prettyPrint(variable: string, lowercase: boolean = false) {
  const splitVar = variable.split('-');
  return splitVar.map(
    (word, i) => (lowercase ? word.charAt(0) : word.charAt(0).toUpperCase()) + splitVar[i].slice(1)
  ).join(' ')
} 

export const Legend: React.FC<ILegendProps> = props => {
  const { variable, period, setPeriod, rcp, setRcp, 
    percentile, setRercentile, layer, forecastSummary } = props

  return (
    <LegendContainer>
      <h2>{prettyPrint(variable)} (in {forecastSummary && forecastSummary.units})</h2>
      <h4>{forecastSummary && forecastSummary.description}</h4>
      <h4>Currently displaying {prettyPrint(variable, true)} forecasts for the climate circa {period}&nbsp;
        under RCP{rcp} scenario at the {percentile} percentile.</h4>
      {forecastSummary && (
        <Distribution layer={layer} color={forecastSummary.gradient[1]} units={forecastSummary.units}
          min={forecastSummary.min} max={forecastSummary.max} />
      )}
      <MeterContainer>
        <h3>Scenario Selection:</h3>
        {rcp && (
          <Meter selectOption={setRcp} selectedOption={rcp} color="#4F5054"
            options={[{ display: 'RCP 4.5', value: '45' }, { display: 'RCP 8.5', value: '85' }]}
          />
        )}
        {percentile && (
          <Meter selectOption={setRercentile} selectedOption={percentile} color="#4F5054"
            options={[{ display: '25th', value: '25th' }, { display: '75th', value: '75th' }]}
          />
        )}
        {period && (
          <Meter selectOption={setPeriod} selectedOption={period} color="#4F5054"
            options={[{ display: '2020', value: '2020' }, { display: '2050', value: '2050' },
                      { display: '2080', value: '2080' }]}
          />
        )}
      </MeterContainer>
    </LegendContainer>
  )
}

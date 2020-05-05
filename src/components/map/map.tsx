import React from "react"
import { Bounds, IGriddedDataset, IGriddedForcast, RCP, Period, Percentile } from '../../lib/types'
import { BaseMap } from './base-map'
import { Legend } from '../legend'
import { Heatmaps } from '../heatmaps'
import { useWindowWidth } from '../../lib/hooks'
import { fetchForecast, fetchFcSummary } from './map.utils'

interface IMapProps {
  defaultBounds: Bounds,
  defaultMobileBounds: Bounds,
  variables: string[]
  introduction: {
    title: string
    subhead: string
    detail: string
  }
}

interface IFCSummary {
  [key: string]: IGriddedForcast
}

export const Map: React.FC<IMapProps> = props => {
  const { defaultBounds, defaultMobileBounds, variables } = props
  const [variable, setVariable] = React.useState<string>(variables[0])
  const [rcp, setRcp] = React.useState<RCP>(null)
  const [period, setPeriod] = React.useState<Period>(null)
  const [percentile, setRercentile] = React.useState<Percentile>(null)
  const [layer, setLayer] = React.useState<IGriddedDataset>()
  const [forecastSummary, setForecastSummary] = React.useState<IFCSummary>({})
  const width = useWindowWidth()

  React.useEffect(() => {    
    async function runFetchSummary(variable: string) {
      const forecast = await fetchFcSummary(variable)
      setDefaults(forecast)
      setForecastSummary(summary => ({ ...summary, [variable]: forecast}))
      runFetchLayer(variable)
    }

    async function runFetchLayer(variable: string) {
      const forecast = await fetchForecast(variable, period, rcp, percentile)
      if (forecast) setLayer(forecast)
    }

    if (!forecastSummary[variable]) runFetchSummary(variable)
    else runFetchLayer(variable)
  }, [variable, period, rcp, percentile])

  function setDefaults(forecast: IGriddedForcast) {
    setPeriod('2020')
    setRercentile('25th')
    if (forecast.datasets['2020_RCP45_25th']) setRcp('45')
    else if (forecast.datasets['2020_25th']) setRcp(null)
    else console.error('Missing forecast datasets')
  }

  return (
    <>
      <BaseMap bounds={width >= 991 ? defaultBounds : defaultMobileBounds}>
        <Legend
          variable={variable} setVariable={setVariable}
          period={period} setPeriod={setPeriod}
          rcp={rcp} setRcp={setRcp} forecastSummary={forecastSummary[variable]}
          percentile={percentile} setRercentile={setRercentile} layer={layer} 
        />
        {layer && forecastSummary[variable] && (
          <Heatmaps layer={layer} forecastSummary={forecastSummary[variable]} />
        )}
      </BaseMap>
    </>
  )
}
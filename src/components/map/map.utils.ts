import { Bounds, IGriddedForcast, IGriddedDataset } from '../../lib/types'

export async function fetchFcSummary(variable: string) {
  const filename = `/gen-data/${variable}.json`
  const response = await fetch(filename, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
  const responseData = await response.json() as IGriddedForcast
  return responseData 
}

type OptString = string | null
export async function fetchForecast(variable: string, period: OptString, rcp: OptString, percentile: OptString) {
  if (period && percentile) {
    const rcpString = rcp ? `_RCP${rcp}_` : `_`
    const filename = `/gen-data/${variable}_${period}${rcpString}${percentile}.json`
    const response = await fetch(filename, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
    const responseData = await response.json() as IGriddedDataset
    return responseData 
  } else {
    return null
  }
}


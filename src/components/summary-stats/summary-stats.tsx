import React from 'react'
import { Label, Table, TableCell, Value } from './summary-stats.styles'
import { RCP, Period, Percentile, IGriddedDataset, IGriddedForcast } from '../../lib/types'
import { mean, median, min, max, quantileSeq } from 'mathjs'

interface ISummaryStats {
  layer?: IGriddedDataset
}

export const SummaryStats: React.FC<ISummaryStats> = props => {
  const { layer } = props
  const { rcp, period, percentile } = layer
  let data = []
  let meanValue, medianValue, minValue, maxValue, tenthValue, nintiethValue 
  
  if (layer && layer.points[0] !== undefined) {
    data = React.useMemo(() => layer.points.map(point => point.value), [period, rcp, percentile]);
    meanValue = React.useMemo(() => mean(data).toLocaleString(), [period, rcp, percentile]);
    medianValue = React.useMemo(() => median(data).toLocaleString(), [period, rcp, percentile]);
    minValue = React.useMemo(() => min(data).toLocaleString(), [period, rcp, percentile]);
    maxValue = React.useMemo(() => max(data).toLocaleString(), [period, rcp, percentile]);
    tenthValue = React.useMemo(() => quantileSeq(data, .1).toLocaleString(), [period, rcp, percentile]);
    nintiethValue = React.useMemo(() => quantileSeq(data, .9).toLocaleString(), [period, rcp, percentile]);
  }

  if (layer && data[0] === undefined) return null
  else return (
    <Table>
      <tbody>
        <tr>
          <TableCell>
            <Label>Minimum</Label>
            <Value data-testid="min-value">{minValue}</Value>
          </TableCell>
          <TableCell>
            <Label>Maximum</Label>
            <Value data-testid="max-value">{maxValue}</Value>
          </TableCell>
        </tr>
        <tr>
          <TableCell>
            <Label>10th Percentile</Label>
            <Value>{tenthValue}</Value>
          </TableCell>
          <TableCell>
            <Label>90th Percentile</Label>
            <Value>{nintiethValue}</Value>
          </TableCell>
        </tr>
        <tr>
          <TableCell>
            <Label>Mean</Label>
            <Value>{meanValue}</Value>
          </TableCell>
          <TableCell>
            <Label>Median</Label>
            <Value>{medianValue}</Value>
          </TableCell>
        </tr>
      </tbody>
    </Table>
  )
}
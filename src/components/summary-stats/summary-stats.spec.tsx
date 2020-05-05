import React from 'react'
import { render } from '@testing-library/react'
import { SummaryStats } from './summary-stats'
import { IGriddedDataset } from '../../lib/types'

test('Min and Max render', () => {
  const layer: IGriddedDataset = {
    name: 'precipitation',
    rcp: '85', 
    period: '2050', 
    percentile: '25th',
    points: [
      {lat: 0, lon: 0, value: 0},
      {lat: 0, lon: 0, value: 5},
      {lat: 0, lon: 0, value: 10}
    ]
  }
  const { getByTestId } = render(<SummaryStats layer={layer}  />)
  expect(getByTestId('min-value')).toHaveTextContent('0')
  expect(getByTestId('max-value')).toHaveTextContent('10')
}) 

test('should not render', () => {
  const layer: IGriddedDataset = {
    name: 'precipitation',
    rcp: '85', 
    period: '2050', 
    percentile: '25th',
    points: []
  }
  const { queryByTestId } = render(<SummaryStats layer={layer}  />)
  expect(queryByTestId('min-value')).toBe(null)
  expect(queryByTestId('max-value')).toBe(null)
}) 
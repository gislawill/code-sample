import React from 'react'
import HeatmapLayer from 'react-leaflet-heatmap-layer'
import { IGridPoint, IGriddedDataset, IGriddedForcast } from '../../lib/types'

interface HeatmapsProps {
  layer: IGriddedDataset
  forecastSummary: IGriddedForcast
}

export const Heatmaps: React.FC<HeatmapsProps> = props => {
  const { forecastSummary, layer } = props
  const decimalCount = layer.points.length.toString().length
  let radius: number, blur: number
  if (decimalCount >= 4) {
    radius = 50
    blur = 25
  } else if (decimalCount === 3) {
    radius = 100
    blur = 33
  } else {
    radius = 200
    blur = 50
  }
  return (
    <HeatmapLayer 
      points={layer.points}
      gradient={forecastSummary.gradient}
      max={forecastSummary.max}
      radius={radius}
      blur={blur}
      longitudeExtractor={(p: IGridPoint) => p.lon}
      latitudeExtractor={(p: IGridPoint) => p.lat}
      intensityExtractor={(p: IGridPoint) => p.value}
    />
  )
}

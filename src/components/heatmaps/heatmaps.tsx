import React from 'react'
import { Circle, Tooltip } from 'react-leaflet'
import HeatmapLayer from 'react-leaflet-heatmap-layer'
import { IGridPoint, IGriddedDataset, IGriddedForcast } from '../../lib/types'
import { getHeapMapConfig } from './heatmap.utils'

interface HeatmapsProps {
  layer: IGriddedDataset
  forecastSummary: IGriddedForcast
}

export const Heatmaps: React.FC<HeatmapsProps> = props => {
  const { layer, forecastSummary: { gradient, max, units } } = props
  const { radius, blur } = getHeapMapConfig(layer.points.length.toString().length)
  return (
    <>
      <HeatmapLayer 
        points={layer.points}
        gradient={gradient}
        max={max}
        radius={radius}
        blur={blur}
        longitudeExtractor={(p: IGridPoint) => p.lon}
        latitudeExtractor={(p: IGridPoint) => p.lat}
        intensityExtractor={(p: IGridPoint) => p.value}
      />
      {layer.points.map(point => (
        <Circle opacity={0.1} fillColor={gradient[1]}
          center={[point.lat, point.lon]} radius={10} 
          key={`${point.lat}-${point.lon}`}>
          <Tooltip>{Math.round(point.value)} {units}</Tooltip>
        </Circle>
      ))}
    </>
  )
}

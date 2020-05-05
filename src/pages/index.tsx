import React from 'react'
import { Map } from '../components/map'
import { Bounds } from '../lib/types'
import mockCMSData from '../mocks/mock-cms.json'

interface IMapPageProps {
  node: { 
    id: string
    slug: string
    details: { 
      bounds: { [key: string]: number }
      mobileBounds: { [key: string]: number }
      forecasts: string[]
      introduction: {
        title: string
        subhead: string
        detail: string
      }
    }
  }
}

const MapPage: React.FC<IMapPageProps> = () => {
  const { node: { details: { bounds, mobileBounds, forecasts, introduction } } } = mockCMSData as IMapPageProps
  const mapBounds: Bounds = [[bounds.north, bounds.west], [bounds.south, bounds.east]]
  const mapMobileBounds: Bounds = [[bounds.north, bounds.west], [bounds.south, bounds.east]]
  return (
    <Map defaultBounds={mapBounds} defaultMobileBounds={mapMobileBounds}
      variables={forecasts} introduction={introduction}
    />
  )
}

export default MapPage
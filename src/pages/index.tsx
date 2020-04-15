import React from 'react'
import { Map } from '../components/map'
import { Bounds } from '../lib/types'
import mockCMSData from '../mocks/mock-cms.json'

interface IMapPageProps {
  node: { 
    id: string
    slug: string
    wordpress_id: number
    details: { 
      bounds: { [key: string]: number }
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
  const { node: { details: { bounds, forecasts, introduction } } } = mockCMSData as IMapPageProps
  const mapBounds: Bounds = [[bounds.north, bounds.west], [bounds.south, bounds.east]]
  return (
    <Map defaultBounds={mapBounds} variables={forecasts} 
      introduction={introduction}
    />
  )
}

export default MapPage
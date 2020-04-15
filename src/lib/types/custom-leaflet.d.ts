import * as leaflet from 'leaflet';

declare module 'leaflet' {
  export type IdwLayer = any
  export type idwLayer = any
  export type setOptions = () => void
}

export type Bounds = [number, number][]
export type LatLonArray = [number, number, number] // Lat, Lon, Value
export type LatLonArrays = LatLonArray[]

export interface DataSummary {
  max: number
  min: number
  data: LatLonArrays
}

export interface IRegionBounds {
  box: Bounds
  view: Bounds
}

export interface IRegionInput {
  box: {
    north: number
    south: number
    west: number
    east: number
  }
  view: {
    north: number
    south: number
    west: number
    east: number
  }
}
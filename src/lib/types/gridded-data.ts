export type RCP = '45' | '85' | null
export type Period = '2020' | '2050' | '2080' | null
export type Percentile = '25th' | '75th' | null

export interface IGradient {
  [key: number]: string
}

export interface IGridPoint {
  lat: number
  lon: number
  value: number
}

export interface IGriddedDataset {
  name: string
  rcp: RCP
  period: Period
  percentile: Percentile
  points: IGridPoint[]
}

export interface IGriddedForcast {
  name: string
  min?: number
  max?: number
  units: string
  description: string
  gradient: IGradient
  datasets: {
    [key: string]: Boolean
  }
}

export interface IForecast {
  title: string
  name: string
  unit: string
  description: string
}
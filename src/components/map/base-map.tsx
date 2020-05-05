import React from "react"
import { Map as LeafletMap, MapProps, TileLayer } from 'react-leaflet'
import { useWindowWidth, useWindowHeight } from '../../lib/hooks'
import "../layout.css"

export const BaseMap: React.FC<MapProps> = (props) => {
  const { children } = props
  const [didLoad, setDidLoad] = React.useState(false)
  
  React.useEffect(() => { setDidLoad(true) })
  const width = useWindowWidth()
  const height = useWindowHeight()
  const [mapHeight, setMapHeight] = React.useState(height)
  React.useEffect(() => {
    setTimeout(() => { setMapHeight(null) }, 1000) // reset map height after leaflet loads
  }, [])

  const mapStyles: React.CSSProperties = {
    height: width >= 991 ? '100vh': mapHeight,
    width: '100%',
    margin: '0 auto',
    position: width >= 991 ? 'fixed' : 'relative'
  }
  console.log('props.bounds', props.bounds)
  return (
    <>
      {didLoad && (
        <LeafletMap 
          animate={false} doubleClickZoom={false} 
          keyboard={false} scrollWheelZoom={false} zoomControl={false} 
          style={mapStyles} {...props}
        >
          <TileLayer
            url="//{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
            subdomains="abcd" maxZoom={19}
          />
          {children}
        </LeafletMap>
      )}
    </>
  )
}

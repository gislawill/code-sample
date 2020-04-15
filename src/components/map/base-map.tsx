import React from "react"
import { Map as LeafletMap, MapProps, TileLayer } from 'react-leaflet'
import "../layout.css"

const mapStyles: React.CSSProperties = {
  height: '100vh',
  width: '100%',
  margin: '0 auto',
  position: 'fixed'
}

export const BaseMap: React.FC<MapProps> = (props) => {
  const { children } = props
  const [didLoad, setDidLoad] = React.useState(false)
  React.useEffect(() => { setDidLoad(true) })
  
  return (
    <>
      {didLoad && (
        <LeafletMap 
          animate={false} doubleClickZoom={false} dragging={false}
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

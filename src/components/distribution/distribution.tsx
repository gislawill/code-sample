import * as React from 'react';
import { Panel } from './distribution.style'
import { IGriddedDataset } from '../../lib/types'
import { createDistGraph } from './distribution.d3'
import { useWindowResize } from '../../lib/hooks'

interface IDistributionProps {
  layer?: IGriddedDataset
  color?: string
  units?: string
  activeValue?: number
}

export const Distribution: React.FC<IDistributionProps> = props => {
  const { layer, color, units, activeValue } = props
  const d3Container = React.useRef<HTMLDivElement>(null);
  
  function runCreate() {
    if (layer && d3Container.current) {      
      const data = layer.points.map(point => point.value)
      d3Container.current.innerHTML = ''
      createDistGraph(d3Container.current, data, color, units, activeValue)
    }
  }
  
  useWindowResize(runCreate)
  React.useEffect(() => { runCreate() })

  return <Panel ref={d3Container} />
}

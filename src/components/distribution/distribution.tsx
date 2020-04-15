import * as React from 'react';
import * as d3 from "d3";
import { Panel } from './distribution.style'
import { IGriddedDataset } from '../../lib/types'

interface IDistributionProps {
  layer?: IGriddedDataset
  min?: number
  max?: number
  color?: string
  units?: string
}

// Based on the work of Yan Holtz: https://www.d3-graph-gallery.com/graph/density_basic.html
function kernelDensityEstimator(kernel: (v: number) => number, X: number[]): (V: any) => [number, number][] {
  return V => X.map(x => ([x, d3.mean(V, (v: number) => kernel(x - v)) as number]));
}

function kernelEpanechnikov(k: number): (v: number) => number {
  return v => Math.abs(v /= k) <= 1 ? 1 * (1 - v * v) / k : 0;
}

export const Distribution: React.FC<IDistributionProps> = props => {
  const { layer, min, max, color, units } = props
  const d3Container = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (layer && d3Container.current) {
      const data = layer.points.map(point => point.value)
      const margin = { top: 20, right: 30, bottom: 40, left: 30 }
      const width = d3Container.current.offsetWidth - margin.left - margin.right
      const height = d3Container.current.offsetHeight - margin.top - margin.bottom;

      const roundedMin = Math.round(min || Math.min(...data))
      const roundedMax = Math.round(max || Math.min(...data))
      // append the svg object to the body of the page
      const svg = d3.select(d3Container.current)
        .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
      
      // add the x Axis
      const xAxis = d3.scaleLinear()
        .domain([roundedMin-1, roundedMax+1])
        .range([0, width]);
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xAxis));
      svg.append("text")             
        .attr("transform",
              "translate(" + (width / 2) + " ," + 
                             (height + margin.top + 10) + ")")
        .style("text-anchor", "middle")
        .text(`Forecasted Value ${units ? `(${units})`: ''}`);

      const mainGradient = svg.append('defs')
        .append('linearGradient')
        .attr('id', 'mainGradient');

      mainGradient.append('stop')
        .attr('stop-color', '#fff')
        .attr('offset', '0');

      mainGradient.append('stop')
        .attr('stop-color', color || "#fff")
        .attr('offset', '1');

      // Compute kernel density estimation
      const firstValue = xAxis.ticks(40)[0]
      const finalValue = xAxis.ticks(40)[39] + 1
      const powerOfValue = finalValue.toString().split('.')[0].length
      const kde = kernelDensityEstimator(kernelEpanechnikov(powerOfValue), xAxis.ticks(40))
      const density = kde(data)
      const densities = density.map(point => point[1])
      const maxDensity = Math.max(...densities)
      
      density.unshift([firstValue, 0])
      density.push([finalValue, 0])

      // add the y Axis
      const yAxis = d3.scaleSqrt()
        .range([height, 0])
        .domain([0, maxDensity]);
      svg.append("g")
        .call(d3.axisLeft(yAxis)
          .tickValues([])
          .tickSize(0));
      svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1.5em")
        .style("text-anchor", "middle")
        .text("Frequency of Value");     
      
      // Plot the area
      svg.append("path").datum(density)
        .attr("fill", 'url(#mainGradient)')
        .attr("fill-opacity", ".5").attr("stroke", "#000")
        .attr("stroke-width", 1).attr("stroke-linejoin", "round")
        .attr("d",  d3.line().curve(d3.curveBasis)
          .x(d => xAxis(d[0]))
          .y(d => yAxis(d[1]))
        );
      
      return () => {
        if (d3Container.current) d3Container.current.innerHTML = ''
      }
    }
  })

  return <Panel ref={d3Container} />
}

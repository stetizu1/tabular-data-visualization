import { FunctionComponent, useCallback, useEffect, useRef } from 'react'
import { axisBottom, axisLeft, brush, extent, scaleLinear, scaleOrdinal, schemeCategory10, select, brushSelection } from 'd3'
import { TestData, testData } from '../test/testData'
import { Margin, defaultMargin, marginWidth, marginHeight } from '../styles/margin'
import { useBasicScatterPlotStyle } from './useBasicScatterPlotStyle'

interface ScatterPlotProps {
  width: number
  height: number
  colors?: [string, string]
  margin?: Margin
}

const isBrushed = (brush_coords: [[number, number], [number, number]], cx: number, cy: number) => {
  const x0 = brush_coords[0][0],
    x1 = brush_coords[1][0],
    y0 = brush_coords[0][1],
    y1 = brush_coords[1][1]
  return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1
}

export const BasicScatterPlot: FunctionComponent<ScatterPlotProps> = ({
  width,
  height,
  margin = defaultMargin,
}) => {
  const style = useBasicScatterPlotStyle()

  const component = useRef<SVGGElement>(null)
  const [innerWidth, innerHeight] = [width - marginWidth(margin), height - marginHeight(margin)]

  // todo to parameters
  const data = testData
  const xValue = (d: TestData) => d.sepalLength
  const yValue = (d: TestData) => d.petalLength
  const catValue = (d: TestData) => d.species

  const createBarChart = useCallback(() => {
    const node = component.current
    if (!node) {
      return
    }
    const color = scaleOrdinal(schemeCategory10)
    const fill = (d: TestData) => color(catValue(d))

    const [xAxisG, yAxisG] = [
      select(node).append(`g`).attr(`transform`, `translate(0,` + innerHeight + `)`),
      select(node).append(`g`),
    ]

    const [xExtent, yExtent] = [extent(data, xValue), extent(data, yValue)]
    if (!xExtent[0] || !yExtent[0]) { // [undefined, undefined]
      return
    }
    const [xScale, yScale] = [scaleLinear(), scaleLinear()]
    const [xAxis, yAxis] = [axisBottom(xScale), axisLeft(yScale)]

    xScale
      .domain(xExtent)
      .range([0, innerWidth])
    yScale
      .domain(yExtent)
      .range([innerHeight, 0])
    const circles = select(node)
      .selectAll(`circle`)
      .data(data)
      .enter()
      .append(`circle`)

    circles
      .attr(`cx`, d => xScale(xValue(d)))
      .attr(`cy`, d => yScale(yValue(d)))
      .attr(`r`, 3)
      .attr(`fill`, fill)
      .attr(`opacity`, 0.1)

    const startBrushing = () => {
      const selection = brushSelection(node)
      if (selection) {
        const extent = selection as [[number, number], [number, number]] // hard retype
        circles.classed(style.selected, (d: TestData) => {
          return isBrushed(extent, xScale(d.sepalLength), yScale(d.petalLength))
        },
        )
      }
    }

    select(node).call(
      brush()
        .extent([[0, -margin.top], [innerWidth, innerHeight]])
        .on(`start brush`, startBrushing),
    )

    xAxisG.call(xAxis)
    yAxisG.call(yAxis)
  }, [data, innerHeight, innerWidth, component, margin, style])

  useEffect(() => createBarChart())
  return <>
    <svg width={width} height={height} className={style.svg}>
      <g ref={component} transform={`translate(${margin.left}, ${margin.top})`}/>
    </svg>
  </>
}

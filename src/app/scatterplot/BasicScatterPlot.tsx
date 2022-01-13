import { useCallback, useEffect, useRef } from 'react'
import {
  axisBottom,
  axisLeft,
  brush,
  extent,
  scaleLinear,
  scaleOrdinal,
  schemeCategory10,
  select,
  ScaleLinear, D3BrushEvent,
} from 'd3'
import { Margin, defaultMargin, marginWidth, marginHeight } from '../styles/margin'
import { useBasicScatterPlotStyle } from './useBasicScatterPlotStyle'
import { isBrushed } from './brushing'

interface BasicScatterPlotProps<T> {
  width: number
  height: number
  dataset: T[]
  getValueX: (data: T) => number
  getValueY: (data: T) => number
  getValueCat: (data:T) => string
  margin?: Margin
}

const addAxes = (node: SVGGElement, xScale: ScaleLinear<number, number>, yScale: ScaleLinear<number, number>, innerHeight: number) => {
  const [xAxisG, yAxisG] = [
    select(node).append(`g`).attr(`transform`, `translate(0,${innerHeight})`),
    select(node).append(`g`),
  ]
  const [xAxis, yAxis] = [axisBottom(xScale), axisLeft(yScale)]
  xAxisG.call(xAxis)
  yAxisG.call(yAxis)
}

export const BasicScatterPlot = <T, >({
  width,
  height,
  dataset, getValueX, getValueY, getValueCat,
  margin = defaultMargin,
}: BasicScatterPlotProps<T>) => {
  const classes = useBasicScatterPlotStyle()

  const component = useRef<SVGGElement>(null)
  const [innerWidth, innerHeight] = [width - marginWidth(margin), height - marginHeight(margin)]

  const createScatterPlot = useCallback(() => {
    const node = component.current
    if (!node) {
      return
    }
    const circles = select(node)
      .selectAll(`circle`)
      .data(dataset).enter()
      .append(`circle`)

    const [xExtent, yExtent] = [extent(dataset, getValueX), extent(dataset, getValueY)]
    if (xExtent[0] === undefined || yExtent[0] === undefined) // [undefined, undefined]
      return
    const [xScale, yScale] = [
      scaleLinear().domain(xExtent).range([0, innerWidth]),
      scaleLinear().domain(yExtent).range([innerHeight, 0]),
    ]
    const fill = (data: T) => scaleOrdinal(schemeCategory10)(getValueCat(data))
    circles
      .attr(`cx`, d => xScale(getValueX(d)))
      .attr(`cy`, d => yScale(getValueY(d)))
      .attr(`r`, 3)
      .attr(`fill`, fill)
      .attr(`opacity`, 0.7)

    addAxes(node, xScale, yScale, innerHeight)

    const startBrushing = ({ selection }: D3BrushEvent<T>) => {
      if (selection) {
        const extent = selection as [[number, number], [number, number]] // hard retype
        circles.classed(classes.selected, (d: T) => {
          return isBrushed(extent, xScale(getValueX(d)), yScale(getValueY(d)))
        })
        circles.classed(classes.notSelected, (d: T) => {
          return !isBrushed(extent, xScale(getValueX(d)), yScale(getValueY(d)))
        })
      }
    }

    const endBrushing = ({ selection }: D3BrushEvent<T>) => {
      if (!selection) {
        circles.classed(classes.selected, false)
        circles.classed(classes.notSelected, false)
      }
    }
    select(node).call(
      brush()
        .extent([[0, -margin.top], [innerWidth, innerHeight]])
        .on(`start brush`, startBrushing)
        .on(`start end`, endBrushing),
    )
  }, [
    dataset, getValueX, getValueY, getValueCat,
    innerHeight, innerWidth, component, margin, classes,
  ])

  useEffect(() => createScatterPlot())
  return <>
    <svg width={width} height={height} className={classes.svg}>
      <g ref={component} transform={`translate(${margin.left}, ${margin.top})`}/>
    </svg>
  </>
}

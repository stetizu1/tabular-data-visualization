import { Dispatch, SetStateAction, useCallback, useEffect, useRef } from 'react'
import {
  axisLeft,
  extent, line,
  scaleLinear,
  scaleOrdinal, scalePoint,
  schemeCategory10,
  select, selectAll,
} from 'd3'

import { SelectableDataType } from '../helpers/data'
import { CleanBrushFunction } from '../helpers/brush'
import { defaultMargin, Margin, marginHeight, marginWidth } from '../styles/margin'
import { COLORS } from '../styles/colors'
import { otherCasesToWhitespaces } from '../helpers/formatText'
import { useParallelCoordinatesStyle } from './useParallelCoordinatesStyle'


interface ParallelCoordinatesProps<T extends SelectableDataType> {
  dataset: T[]
  width: number
  height: number
  margin?: Margin
  setSelected?: (selected: boolean[]) => void
  catAttribute?: keyof T
  setCleanScatterPlotBrush: Dispatch<SetStateAction<CleanBrushFunction[]>>
}

export const ParallelCoordinates = <T extends SelectableDataType>({
  width,
  height,
  dataset,
  margin = defaultMargin,
  catAttribute,
}: ParallelCoordinatesProps<T>) => {
  const classes = useParallelCoordinatesStyle()
  const component = useRef<SVGGElement>(null)

  let someSelected = false

  selectAll(`.${classes.line}`)
    .classed(classes.selected, (dRaw) => {
      const d = dRaw as T
      if (d.selected)
        someSelected = true
      return d.selected
    })
    .classed(classes.hidden, (dRaw) => {
      const d = dRaw as T
      return someSelected && !d.selected
    })

  const [innerWidth, innerHeight] = [width - marginWidth(margin), height - marginHeight(margin)]
  const createScatterPlotMatrix = useCallback(() => {
    const node = component.current
    if (!node) {
      return
    }
    const svg = select(node)
    const dimensions = (Object.keys(dataset[0]).filter((key) => {
      return typeof dataset[0][key] === `number`
    })) as Array<keyof T>

    const domainByDimensionsUnchecked = Object.fromEntries(dimensions.map((key) => [key, extent(dataset, (d) => Number(d[key]))]))
    if (Object.values(domainByDimensionsUnchecked).some((domain) => domain[0] === undefined))
      return
    const domainByDimensions = domainByDimensionsUnchecked as { [key in keyof T]: [number, number] }
    const yScales = dimensions.map((attribute) =>
      scaleLinear([innerHeight, 0]).domain(domainByDimensions[attribute]),
    )
    const xScale = scalePoint([0, innerWidth])
      .domain(dimensions.map((d) => String(d)))

    const color = scaleOrdinal(schemeCategory10)
    svg.selectAll(`path`)
      .data(dataset).enter()
      .append(`path`)
      .attr(`d`, (d) => line()(dimensions.map((p) => [Number(xScale(String(p))), yScales[dimensions.indexOf(p)](Number(d[p]))])))
      .attr(`class`, classes.line)
      .style(`fill`, `none`)
      .style(`stroke`, (d) => catAttribute ? color(String(d[catAttribute])) : COLORS.scatterPlotNoCategoryColor)
      .style(`opacity`, 0.5)
    svg.selectAll(`axes`)
      .data(dimensions).enter()
      .append(`g`)
      .attr(`transform`, (d) => `translate(${xScale(String(d))}, 0)`)
      .each((d, idx, elements) =>
        select(elements[idx])
          .call(axisLeft(yScales[dimensions.indexOf(d)]),
          ))
      .append(`text`)
      .style(`text-anchor`, `middle`)
      .attr(`y`, -9)
      .text((d) => otherCasesToWhitespaces(String(d)))
      .style(`fill`, `black`)
  }, [dataset, innerWidth, innerHeight, classes, catAttribute])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => createScatterPlotMatrix(), [])

  return (
    <svg width={width} height={height} className={classes.svg}>
      <g ref={component} transform={`translate(${margin.left}, ${margin.top})`} />
    </svg>
  )
}

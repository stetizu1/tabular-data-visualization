import { useCallback, useEffect, useRef } from 'react'
import {
  axisLeft,
  brushY,
  D3BrushEvent,
  extent,
  line,
  scaleLinear,
  scaleOrdinal,
  scalePoint,
  schemeCategory10,
  select,
  selectAll,
} from 'd3'

import { SelectableDataType } from '../../helpers/data'
import { Brush, Brushable } from '../../helpers/brush'
import { defaultMargin, Margin, marginHeight, marginWidth } from '../../styles/margin'
import { COLORS } from '../../styles/colors'
import { otherCasesToWhitespaces } from '../../helpers/formatText'
import { useParallelCoordinatesStyle } from './useParallelCoordinatesStyle'


interface ParallelCoordinatesProps<T extends SelectableDataType> extends Brushable {
  dataset: T[]
  width: number
  height: number
  margin?: Margin
  setSelected: (selected: boolean[]) => void
  catAttribute?: keyof T
}

export const ParallelCoordinates = <T extends SelectableDataType>({
  width,
  height,
  dataset,
  margin = defaultMargin,
  catAttribute,
  setSelected,
  clean, setCleanBrushes, setComponentBrushing,
  isBrushingActive, setIsBrushingActive,
}: ParallelCoordinatesProps<T>) => {
  const classes = useParallelCoordinatesStyle()
  const component = useRef<SVGGElement>(null)

  selectAll(`.${classes.line}`)
    .classed(classes.selected, (dRaw) => {
      const d = dRaw as T
      return d.selected
    })
    .classed(classes.hidden, (dRaw) => {
      const d = dRaw as T
      return isBrushingActive && !d.selected
    })

  const [innerWidth, innerHeight] = [width - marginWidth(margin), height - marginHeight(margin)]
  const brushWidth = 30
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

    const selections = Object.fromEntries(dimensions.map((key) => [key, null])) as { [key in keyof T]: [number, number] | null }
    const setBrushed = () => {
      dataset.forEach((data) => {
        data.selected = dimensions.every((dimension) => {
          const selectedRange = selections[dimension]
          if (selectedRange === null)
            return true
          const dataPoint = yScales[dimensions.indexOf(dimension)](Number(data[dimension]))
          return dataPoint > selectedRange[0] && dataPoint < selectedRange[1]
        })
      })
      setSelected(dataset.map((data) => data.selected))
    }

    const brush = brushY<keyof T>()
      .extent([
        [-(brushWidth / 2), -(margin.top / 2)],
        [brushWidth / 2, innerHeight + margin.top / 2],
      ])
      .on(Brush.start, () => {
        clean(node)
        setComponentBrushing(node)
        setIsBrushingActive(true)
      })
      .on(Brush.move, (brushEvent: D3BrushEvent<T>, axisName) => {
        selections[axisName] = brushEvent.selection as [number, number] | null // yBrush
        setBrushed()
      })
      .on(Brush.end, (brushEvent: D3BrushEvent<T>, axisName) => {
        const brushSelection = brushEvent.selection as [number, number] | null // yBrush
        selections[axisName] = brushSelection
        if (Object.values(selections).every((data) => data === null)) {
          dataset.forEach((data) => data.selected = false)
          setSelected(dataset.map((data) => data.selected))
          setIsBrushingActive(false)
          return
        }
        if (brushSelection == null)
          setBrushed()
      })

    const color = scaleOrdinal(schemeCategory10)
    svg.selectAll(`path`)
      .data(dataset).enter()
      .append(`path`)
      .attr(`d`, (d) => line()(dimensions.map((p) => [Number(xScale(String(p))), yScales[dimensions.indexOf(p)](Number(d[p]))])))
      .attr(`class`, classes.line)
      .style(`fill`, `none`)
      .style(`stroke`, (d) => catAttribute ? color(String(d[catAttribute])) : COLORS.scatterPlotNoCategoryColor)
      .style(`opacity`, 0.5)

    const axes = svg.selectAll(`axes`)
      .data(dimensions).enter()
      .append(`g`)
      .attr(`transform`, (d) => `translate(${xScale(String(d))}, 0)`)
      .each((d, idx, elements) =>
        select(elements[idx])
          .call(axisLeft(yScales[dimensions.indexOf(d)]),
          ))
      .call(brush)

    const clearBrush = () => {
      axes.each((d, idx, elements) => {
        brushY().clear(select(elements[idx]))
      })
    }

    setCleanBrushes((prev) => [...prev, () => {
      clearBrush()
      dimensions.map((key) => selections[key] = null)
      dataset.forEach((data) => data.selected = false)
      setSelected(dataset.map((data) => data.selected))
    }])

    axes
      .append(`text`)
      .style(`text-anchor`, `middle`)
      .attr(`y`, -9)
      .text((d) => otherCasesToWhitespaces(String(d)))
      .style(`fill`, `black`)
      .style(`font-size`, `1.2em`)
  }, [
    dataset, innerWidth, innerHeight, classes, catAttribute, setSelected, margin,
    clean, setComponentBrushing, setCleanBrushes, setIsBrushingActive,
  ])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => createScatterPlotMatrix(), [])

  return (
    <svg width={width} height={height} className={classes.svg}>
      <g ref={component} transform={`translate(${margin.left}, ${margin.top})`}/>
    </svg>
  )
}

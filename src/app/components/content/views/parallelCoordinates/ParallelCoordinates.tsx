import { FunctionComponent, useCallback, useEffect, useRef } from 'react'
import {
  axisLeft,
  brushY,
  D3BrushEvent,
  line,
  scaleLinear,
  scaleOrdinal,
  scalePoint,
  schemeCategory10,
  select,
  selectAll,
} from 'd3'

import { SelectableDataType } from '../../../../types/data/data'
import { Brushable } from '../../../../types/brushing/Brushable'
import { BrushAction } from '../../../../types/brushing/BrushAction'
import { BrushSelection2d } from '../../../../types/brushing/BrushSelection'
import { Visualization } from '../../../../types/views/Visualization'
import { ParallelCoordinatesSettings } from '../../../../types/views/parallelCoordinates/ParallelCoordinatesSettings'

import { toStringArray } from '../../../../helpers/basic/retype'
import { inRange } from '../../../../helpers/basic/numerical'
import { GET_EVERYTHING, getTranslate } from '../../../../helpers/d3/stringSetters'
import { otherCasesToWhitespaces } from '../../../../helpers/data/formatText'
import { getExtentInDomains } from '../../../../helpers/d3/extent'
import { getDefaultSelectionForAttributes } from '../../../../helpers/data/data'

import { defaultMargin } from '../../../../constants/defaultMargin'

import { PLOT_COLORS } from '../../../../styles/colors'

import { useParallelCoordinatesStyle } from './useParallelCoordinatesStyle'

const BRUSH_WIDTH = 30
const TEXT_SPACING_LEFT = 22
const TEXT_SPACING_RIGHT = 5

export interface ParallelCoordinatesProps extends Visualization, Brushable, ParallelCoordinatesSettings {}

export const ParallelCoordinates: FunctionComponent<ParallelCoordinatesProps> = ({
  width,
  height,
  dataset,
  margin = defaultMargin,
  displayAttributes,
  categoryAttribute,
  setSelected,
  cleanBrushes,
  setCleanBrushes,
  setComponentBrushing,
  isBrushingActive,
}) => {
  const classes = useParallelCoordinatesStyle()
  const component = useRef<SVGGElement>(null)

  const [innerWidth, innerHeight] = [
    width - margin.width - (TEXT_SPACING_LEFT + TEXT_SPACING_RIGHT),
    height - margin.height,
  ]

  // selected coloring
  selectAll(`.${classes.line}`)
    .classed(classes.selected, (d) => (d as SelectableDataType).selected)
    .classed(classes.hidden, (d) => isBrushingActive && !(d as SelectableDataType).selected)

  const createScatterPlotMatrix = useCallback(() => {
    const node = component.current!
    const svg = select(node)
    svg.selectAll(GET_EVERYTHING).remove() // clear

    const extentInDomains = getExtentInDomains(displayAttributes, dataset)
    const xScale = scalePoint([0, innerWidth]).domain(toStringArray(displayAttributes))
    const yScales = displayAttributes.map((attribute) =>
      scaleLinear([innerHeight, 0]).domain(extentInDomains[attribute]),
    )

    const selections = getDefaultSelectionForAttributes(displayAttributes)
    const setBrushingInSelection = (selected: boolean[]): void => {
      selected.forEach((isSelected, idx) => {
        dataset[idx].selected = isSelected
      })
      setSelected(selected)
    }

    const setBrushed = () => {
      setBrushingInSelection(
        dataset.map((data) =>
          displayAttributes.every((dimension, idx) => {
            const selectedRange = selections[dimension]
            if (selectedRange === null) return true // nothing in dimension selected, do not block
            const valueOnAxis = yScales[idx](Number(data[dimension]))
            return inRange(valueOnAxis, selectedRange)
          }),
        ),
      )
    }

    const brush = brushY<keyof SelectableDataType>()
      .extent([
        [-(BRUSH_WIDTH / 2), -(margin.bottom / 2)],
        [BRUSH_WIDTH / 2, innerHeight + margin.top / 2],
      ])
      .on(BrushAction.start, () => {
        cleanBrushes(node)
        setComponentBrushing(node)
      })
      .on(BrushAction.move, (brushEvent: D3BrushEvent<SelectableDataType>, axisName) => {
        selections[axisName] = brushEvent.selection as BrushSelection2d
        setBrushed()
      })
      .on(BrushAction.end, (brushEvent: D3BrushEvent<SelectableDataType>, axisName) => {
        const brushSelection = brushEvent.selection as BrushSelection2d
        selections[axisName] = brushSelection
        if (Object.values(selections).every((data) => data === null)) {
          dataset.forEach((data) => (data.selected = false))
          setSelected(dataset.map((data) => data.selected))
          setComponentBrushing(null)
          return
        }
        if (brushSelection === null) setBrushed()
      })

    const color = scaleOrdinal(schemeCategory10)
    svg
      .selectAll(`path`)
      .data(dataset)
      .enter()
      .append(`path`)
      .attr(`d`, (d) =>
        line()(
          displayAttributes.map((p) => [
            Number(xScale(String(p))),
            yScales[displayAttributes.indexOf(p)](Number(d[p])),
          ]),
        ),
      )
      .attr(`class`, classes.line)
      .style(`fill`, `none`)
      .style(`stroke`, (d) => (categoryAttribute ? color(String(d[categoryAttribute])) : PLOT_COLORS.noCategoryColor))
      .style(`opacity`, 0.5)

    const axes = svg
      .selectAll(`axes`)
      .data(displayAttributes)
      .enter()
      .append(`g`)
      .attr(`transform`, (d) => `translate(${xScale(String(d))}, 0)`)
      .each((d, idx, elements) => select(elements[idx]).call(axisLeft(yScales[displayAttributes.indexOf(d)])))
      .call(brush)

    const clearBrush = () => {
      axes.each((d, idx, elements) => {
        brushY().clear(select(elements[idx]))
      })
    }

    setCleanBrushes((prev) => [
      ...prev,
      () => {
        clearBrush()
        displayAttributes.map((key) => (selections[key] = null))
        dataset.forEach((data) => (data.selected = false))
        setSelected(dataset.map((data) => data.selected))
      },
    ])

    axes
      .append(`text`)
      .style(`text-anchor`, `middle`)
      .attr(`y`, -9)
      .text((d) => otherCasesToWhitespaces(String(d)))
      .style(`fill`, `black`)
      .style(`font-size`, `1.2em`)
  }, [
    dataset,
    innerWidth,
    innerHeight,
    classes,
    categoryAttribute,
    displayAttributes,
    setSelected,
    margin,
    cleanBrushes,
    setComponentBrushing,
    setCleanBrushes,
  ])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => createScatterPlotMatrix(), [displayAttributes, categoryAttribute])

  return (
    <svg width={width} height={height} className={classes.svg}>
      <g
        ref={component}
        width={innerWidth}
        height={innerHeight}
        transform={getTranslate([margin.left + TEXT_SPACING_LEFT, margin.top])}
      />
    </svg>
  )
}

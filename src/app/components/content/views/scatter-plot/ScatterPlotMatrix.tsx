import { FunctionComponent, useCallback, useEffect, useMemo, useRef } from 'react'
import {
  axisBottom,
  axisLeft,
  brush,
  D3BrushEvent,
  extent,
  scaleLinear,
  scaleOrdinal,
  select,
  selectAll,
  ValueFn,
} from 'd3'
import clsx from 'clsx'

import { SelectableDataType } from '../../../../types/data/data'
import { VisualizationView } from '../../../../types/views/VisualizationView'
import { Brushable } from '../../../../types/brushing/Brushable'
import { ScatterPlotMatrixSettings } from '../../../../types/views/scatter-plot/ScatterPlotMatrixSettings'
import { Margin } from '../../../../types/styling/Margin'

import { otherCasesToWhitespaces } from '../../../../helpers/data/formatText'
import { getClass, getTranslate } from '../../../../helpers/d3/stringGetters'

import { BrushAction } from '../../../../constants/brushing/BrushAction'
import { ViewType } from '../../../../constants/views/ViewTypes'
import { SVG } from '../../../../constants/svg'
import {
  MIN_SCATTER_PLOT_MATRIX_ATTRIBUTE_COUNT,
  SCATTER_PLOT_DEFAULT_MARGIN,
} from '../../../../constants/views/scatterPlotMatrix'

import { SCATTER_PLOT_MATRIX_TEXT } from '../../../../text/views-and-menus/scatterPlotMatrix'

import { PLOT_COLORS } from '../../../../styles/colors'

import { useScatterPlotMatrixStyle } from '../../../../components-style/content/views/scatter-plot/useScatterPlotMatrixStyle'

import { isBrushed } from './brushing'

export interface ScatterPlotMatrixProps extends VisualizationView, Brushable, ScatterPlotMatrixSettings {
  dataPointSize?: number
}

interface MatrixItem {
  col: number
  row: number
  keyCol: keyof SelectableDataType
  keyRow: keyof SelectableDataType
}

export const DATA_POINT = `dataPoint`
export const AXIS_X = `axisX`
export const AXIS_Y = `axisY`
export const CELL = `cell`

export const ScatterPlotMatrix: FunctionComponent<ScatterPlotMatrixProps> = ({
  width,
  height,
  dataset,
  setDataSelected,
  displayAttributes,
  categoryAttribute,
  registerCleanBrushing,
  setComponentBrushing,
  isBrushingActive,
  colorCategory,
  dataPointSize = 4,
  margins = SCATTER_PLOT_DEFAULT_MARGIN,
}) => {
  const margin = useMemo(() => new Margin(...margins), [margins])
  const classes = useScatterPlotMatrixStyle({ width, height, margin })
  const component = useRef<SVGGElement>(null)
  const color = scaleOrdinal(colorCategory)

  const size = width < height ? width : height

  selectAll(getClass(classes.dataPoint))
    .classed(classes.selected, (d) => (d as SelectableDataType).selected)
    .classed(classes.hidden, (d) => isBrushingActive && !(d as SelectableDataType).selected)

  const createScatterPlotMatrix = useCallback(() => {
    const node = component.current
    if (!node) {
      return
    }
    const makeMatrix = (keys: (keyof SelectableDataType)[]): MatrixItem[] =>
      keys.map((keyCol, col) => keys.map((keyRow, row) => ({ row, col, keyRow, keyCol }))).flat()

    const quantCount = displayAttributes.length

    const domainByQuantAttributesUnchecked = Object.fromEntries(
      displayAttributes.map((key) => [key, extent(dataset, (d) => Number(d[key]))]),
    )
    if (Object.values(domainByQuantAttributesUnchecked).some((domain) => domain[0] === undefined)) return
    const domainByQuantAttributes = domainByQuantAttributesUnchecked as {
      [key in keyof SelectableDataType]: [number, number]
    }

    const rect = {
      width: size / quantCount - margin.left,
      height: size / quantCount - margin.top,
    }

    const [x, y] = [
      scaleLinear([margin.left, rect.width - margin.left]),
      scaleLinear([rect.height - margin.top, margin.top]),
    ]

    const [xAxis, yAxis] = [axisBottom(x).ticks(6), axisLeft(y).ticks(6)]

    xAxis.tickSize(rect.width * quantCount)
    yAxis.tickSize(-1 * rect.height * quantCount)

    const group = select(node)
      .attr(SVG.attributes.width, rect.width * quantCount + margin.width)
      .attr(SVG.attributes.height, rect.height * quantCount + margin.height)
      .attr(SVG.attributes.transform, getTranslate([margin.width, margin.top]))

    group
      .selectAll(AXIS_X)
      .data(displayAttributes)
      .enter()
      .append(SVG.elements.g)
      .attr(SVG.attributes.class, clsx(classes.x, classes.axis))
      .attr(SVG.attributes.transform, (d, i) => getTranslate([(quantCount - i - 1) * rect.width, 0]))
      .each((d, idx, elements) => {
        x.domain(domainByQuantAttributes[d])
        select(elements[idx]).call(xAxis)
      })

    group
      .selectAll(AXIS_Y)
      .data(displayAttributes)
      .enter()
      .append(SVG.elements.g)
      .attr(SVG.attributes.class, clsx(classes.y, classes.axis))
      .attr(SVG.attributes.transform, (d, idx) => getTranslate([0, idx * rect.height]))
      .each((d, idx, elements) => {
        y.domain(domainByQuantAttributes[d])
        select(elements[idx]).call(yAxis)
      })

    const plot: ValueFn<SVGGElement, MatrixItem, void> = (p, idx, elements) => {
      const cell = select(elements[idx])

      x.domain(domainByQuantAttributes[p.keyRow])
      y.domain(domainByQuantAttributes[p.keyCol])

      cell
        .append(SVG.elements.rect)
        .attr(SVG.attributes.class, classes.frame)
        .attr(SVG.attributes.x, margin.left)
        .attr(SVG.attributes.y, margin.top)
        .attr(SVG.attributes.width, rect.width - margin.width)
        .attr(SVG.attributes.height, rect.height - margin.height)

      cell
        .selectAll(DATA_POINT)
        .data(dataset)
        .enter()
        .append(SVG.elements.circle)
        .attr(SVG.attributes.cx, (d) => x(Number(d[p.keyRow])))
        .attr(SVG.attributes.cy, (d) => y(Number(d[p.keyCol])))
        .attr(SVG.attributes.r, dataPointSize)
        .attr(SVG.attributes.class, classes.dataPoint)
        .style(SVG.attributes.fill, (d) =>
          categoryAttribute ? color(String(d[categoryAttribute])) : PLOT_COLORS.noCategoryColor,
        )
    }

    const cell = group
      .selectAll(CELL)
      .data(makeMatrix(displayAttributes))
      .enter()
      .append(SVG.elements.g)
      .attr(SVG.attributes.class, classes.cell)
      .attr(SVG.attributes.transform, (d) => getTranslate([(quantCount - d.row - 1) * rect.width, d.col * rect.height]))
      .each(plot)

    cell
      .filter((d) => d.row === d.col)
      .append(SVG.elements.text)
      .attr(SVG.attributes.x, margin.width)
      .attr(SVG.attributes.y, margin.height + margin.top)
      .text((d) => otherCasesToWhitespaces(String(d.keyRow)))

    let brushCell = { row: -1, col: -1 }

    const clearBrush = () => {
      cell.each((d, idx, elements) => {
        brush().clear(select(elements[idx]))
      })
    }

    registerCleanBrushing(() => {
      clearBrush()
      brushCell = { row: -1, col: -1 }
    })

    const startBrush = (_: D3BrushEvent<SelectableDataType>, { row, col, keyRow, keyCol }: MatrixItem) => {
      setComponentBrushing(ViewType.ScatterPlotMatrix)
      if (brushCell.row !== row || brushCell.col !== col) {
        clearBrush()
        brushCell = { row, col }
        x.domain(domainByQuantAttributes[keyRow])
        y.domain(domainByQuantAttributes[keyCol])
      }
    }

    const moveBrush = ({ selection }: D3BrushEvent<SelectableDataType>, { keyRow, keyCol }: MatrixItem) => {
      if (selection) {
        const extent = selection as [[number, number], [number, number]]
        setDataSelected((data) => isBrushed(extent, x(Number(data[keyRow])), y(Number(data[keyCol]))))
      }
    }

    const endBrush = ({ selection }: D3BrushEvent<SelectableDataType>) => {
      if (!selection) {
        setDataSelected((data) => (data.selected = false))
        setComponentBrushing(null)
      }
    }

    const makeBrush = brush<MatrixItem>()
      .on(BrushAction.start, startBrush)
      .on(BrushAction.move, moveBrush)
      .on(BrushAction.end, endBrush)
      .extent([
        [0, 0],
        [rect.width, rect.height],
      ])

    cell.call(makeBrush)
  }, [
    dataset,
    size,
    classes,
    setDataSelected,
    categoryAttribute,
    displayAttributes,
    setComponentBrushing,
    registerCleanBrushing,
    dataPointSize,
    color,
    margin,
  ])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => createScatterPlotMatrix(), [displayAttributes, categoryAttribute])

  if (displayAttributes.length >= MIN_SCATTER_PLOT_MATRIX_ATTRIBUTE_COUNT) {
    return (
      <svg width={size} height={size} className={classes.svg}>
        <g ref={component} />
      </svg>
    )
  }
  return <div className={classes.notDisplayed}>{SCATTER_PLOT_MATRIX_TEXT.unavailable}</div>
}

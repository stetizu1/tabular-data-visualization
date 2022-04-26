import { FunctionComponent, useCallback, useEffect, useMemo, useRef } from 'react'
import { axisBottom, axisLeft, brush, D3BrushEvent, scaleLinear, scaleOrdinal, select, selectAll, ValueFn } from 'd3'
import clsx from 'clsx'

import { SelectableDataType } from '../../../../types/data/data'
import { VisualizationView } from '../../../../types/views/VisualizationView'
import { Brushable } from '../../../../types/brushing/Brushable'
import { ScatterPlotMatrixSettings } from '../../../../types/views/scatter-plot/ScatterPlotMatrixSettings'
import { Margin } from '../../../../types/styling/Margin'
import { Dimensions } from '../../../../types/basic/dimensions'
import { MatrixItem, MatrixPosition } from '../../../../types/data/MatrixData'

import { otherCasesToWhitespaces } from '../../../../helpers/data/formatText'
import { getClass, getEverything, getTranslate } from '../../../../helpers/d3/stringGetters'

import { BrushAction } from '../../../../constants/brushing/BrushAction'
import { ViewType } from '../../../../constants/views/ViewTypes'
import { SVG } from '../../../../constants/svg'
import {
  MIN_SCATTER_PLOT_MATRIX_ATTRIBUTE_COUNT,
  SCATTER_PLOT_DEFAULT_MARGIN,
} from '../../../../constants/views/scatterPlotMatrix'

import { getExtentInDomains } from '../../../../helpers/d3/extent'
import { makeMatrix } from '../../../../helpers/d3/matrix'

import { SCATTER_PLOT_MATRIX_TEXT } from '../../../../text/views-and-menus/scatterPlotMatrix'

import { PLOT_COLORS } from '../../../../styles/colors'

import { useScatterPlotMatrixStyle } from '../../../../components-style/content/views/scatter-plot/useScatterPlotMatrixStyle'

import { isBrushed } from './brushing'

export interface ScatterPlotMatrixProps extends VisualizationView, Brushable, ScatterPlotMatrixSettings {
  dataPointSize?: number
}

export const DATA_POINT = `dataPoint`
export const AXIS_X = `axisX`
export const AXIS_Y = `axisY`
export const CELL = `cell`
export const SPACING = {
  HORIZONTAL: 12,
  VERTICAL: 12,
}
export const DEFAULT_DATA_POINT_SIZE = 4
export const TICKS = {
  X: 6,
  Y: 6,
}

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
  dataPointSize = DEFAULT_DATA_POINT_SIZE,
  margins = SCATTER_PLOT_DEFAULT_MARGIN,
}) => {
  const margin = useMemo(() => new Margin(...margins), [margins])
  const classes = useScatterPlotMatrixStyle({ width, height, margin })
  const component = useRef<SVGGElement>(null)
  const color = scaleOrdinal(colorCategory)

  const [innerWidth, innerHeight] = [width - margin.width, height - margin.height]

  selectAll(getClass(classes.dataPoint))
    .classed(classes.selected, (d) => (d as SelectableDataType).selected)
    .classed(classes.hidden, (d) => isBrushingActive && !(d as SelectableDataType).selected)

  const createScatterPlotMatrix = useCallback(() => {
    const node = component.current!
    const svg = select(node)
    svg.selectAll(getEverything()).remove() // clear

    const attributesCount = displayAttributes.length
    const rect: Dimensions = {
      width: innerWidth / attributesCount,
      height: innerHeight / attributesCount,
    }
    const extentInDomains = getExtentInDomains(displayAttributes, dataset)

    const [x, y] = [
      scaleLinear([SPACING.HORIZONTAL, rect.width - SPACING.HORIZONTAL]),
      scaleLinear([rect.height - SPACING.VERTICAL, SPACING.VERTICAL]),
    ]

    const [xAxis, yAxis] = [axisBottom(x).ticks(TICKS.X), axisLeft(y).ticks(TICKS.Y)]
    xAxis.tickSize(innerHeight)
    yAxis.tickSize(-innerWidth)

    svg
      .selectAll(AXIS_X)
      .data(displayAttributes)
      .enter()
      .append(SVG.elements.g)
      .attr(SVG.attributes.class, clsx(classes.x, classes.axis))
      .attr(SVG.attributes.transform, (d, i) => getTranslate([(attributesCount - i - 1) * rect.width, 0]))
      .each((d, idx, elements) => {
        x.domain(extentInDomains[d])
        select(elements[idx]).call(xAxis)
      })

    svg
      .selectAll(AXIS_Y)
      .data(displayAttributes)
      .enter()
      .append(SVG.elements.g)
      .attr(SVG.attributes.class, clsx(classes.y, classes.axis))
      .attr(SVG.attributes.transform, (d, idx) => getTranslate([0, idx * rect.height]))
      .each((d, idx, elements) => {
        y.domain(extentInDomains[d])
        select(elements[idx]).call(yAxis)
      })

    const plot: ValueFn<SVGGElement, MatrixItem, void> = (p, idx, elements) => {
      const cell = select(elements[idx])

      x.domain(extentInDomains[p.rowKey])
      y.domain(extentInDomains[p.colKey])

      cell
        .append(SVG.elements.rect)
        .attr(SVG.attributes.class, classes.frame)
        .attr(SVG.attributes.x, SPACING.HORIZONTAL)
        .attr(SVG.attributes.y, SPACING.VERTICAL)
        .attr(SVG.attributes.width, rect.width - 2 * SPACING.HORIZONTAL)
        .attr(SVG.attributes.height, rect.height - 2 * SPACING.VERTICAL)

      cell
        .selectAll(DATA_POINT)
        .data(dataset)
        .enter()
        .append(SVG.elements.circle)
        .attr(SVG.attributes.cx, (d) => x(Number(d[p.rowKey])))
        .attr(SVG.attributes.cy, (d) => y(Number(d[p.colKey])))
        .attr(SVG.attributes.r, dataPointSize)
        .attr(SVG.attributes.class, classes.dataPoint)
        .style(SVG.attributes.fill, (d) =>
          categoryAttribute ? color(String(d[categoryAttribute])) : PLOT_COLORS.noCategoryColor,
        )
    }

    const cell = svg
      .selectAll(CELL)
      .data(makeMatrix(displayAttributes))
      .enter()
      .append(SVG.elements.g)
      .attr(SVG.attributes.class, classes.cell)
      .attr(SVG.attributes.transform, (d) =>
        getTranslate([(attributesCount - d.rowIdx - 1) * rect.width, d.colIdx * rect.height]),
      )
      .each(plot)

    cell
      .filter((d) => d.rowIdx === d.colIdx)
      .append(SVG.elements.text)
      .attr(SVG.attributes.x, 2 * SPACING.HORIZONTAL)
      .attr(SVG.attributes.y, 3 * SPACING.VERTICAL)
      .text((d) => otherCasesToWhitespaces(String(d.rowKey)))

    let brushCell: MatrixPosition = { rowIdx: -1, colIdx: -1 }

    const clearBrush = () => {
      cell.each((d, idx, elements) => {
        brush().clear(select(elements[idx]))
      })
    }

    registerCleanBrushing(() => {
      clearBrush()
      brushCell = { rowIdx: -1, colIdx: -1 }
    })

    const startBrush = (_: D3BrushEvent<SelectableDataType>, { rowIdx, colIdx, rowKey, colKey }: MatrixItem) => {
      setComponentBrushing(ViewType.ScatterPlotMatrix)
      if (brushCell.rowIdx !== rowIdx || brushCell.colIdx !== colIdx) {
        clearBrush()
        brushCell = { rowIdx, colIdx }
        x.domain(extentInDomains[rowKey])
        y.domain(extentInDomains[colKey])
      }
    }

    const moveBrush = ({ selection }: D3BrushEvent<SelectableDataType>, { rowKey, colKey }: MatrixItem) => {
      if (selection) {
        const extent = selection as [[number, number], [number, number]]
        setDataSelected((data) => isBrushed(extent, x(Number(data[rowKey])), y(Number(data[colKey]))))
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
    innerWidth,
    innerHeight,
    classes,
    setDataSelected,
    categoryAttribute,
    displayAttributes,
    setComponentBrushing,
    registerCleanBrushing,
    dataPointSize,
    color,
  ])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => createScatterPlotMatrix(), [displayAttributes, categoryAttribute])

  if (displayAttributes.length >= MIN_SCATTER_PLOT_MATRIX_ATTRIBUTE_COUNT) {
    return (
      <svg width={width} height={height} className={classes.svg}>
        <g ref={component} transform={getTranslate([margin.left, margin.top])} />
      </svg>
    )
  }
  return <div className={classes.notDisplayed}>{SCATTER_PLOT_MATRIX_TEXT.unavailable}</div>
}

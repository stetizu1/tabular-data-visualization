import { FunctionComponent, useCallback, useEffect, useMemo, useRef } from 'react'
import {
  Axis,
  axisBottom,
  axisLeft,
  brush,
  D3BrushEvent,
  NumberValue,
  ScaleLinear,
  scaleLinear,
  scaleOrdinal,
  select,
  selectAll,
} from 'd3'
import clsx from 'clsx'

import { SelectableDataType } from '../../../../types/data/data'
import { VisualizationView } from '../../../../types/views/VisualizationView'
import { Brushable } from '../../../../types/brushing/Brushable'
import { ScatterPlotMatrixSettings } from '../../../../types/views/scatter-plot/ScatterPlotMatrixSettings'
import { Margin } from '../../../../types/styling/Margin'
import { Dimensions } from '../../../../types/basic/dimensions'
import { MatrixItem, MatrixPosition } from '../../../../types/data/MatrixData'
import { BrushSelection2d } from '../../../../types/brushing/BrushSelection'
import { DataEachCircle, DataEachG } from '../../../../types/d3-types'

import {
  getAttributeFromMatrixFormatted,
  getClass,
  getEverything,
  getTranslate,
} from '../../../../helpers/d3/stringGetters'
import { getExtentInDomains } from '../../../../helpers/d3/extent'
import {
  getMatrix,
  getCellInnerExtent,
  getCellInnerSize,
  getCellTranslateInMatrix,
} from '../../../../helpers/d3/matrix'
import { isInRanges } from '../../../../helpers/basic/range'
import { getCategoryColor } from '../../../../helpers/d3/attributeGetters'

import { BrushAction } from '../../../../constants/actions/BrushAction'
import { ViewType } from '../../../../constants/views/ViewTypes'
import { SVG } from '../../../../constants/svg'
import {
  MIN_SCATTER_PLOT_MATRIX_ATTRIBUTE_COUNT,
  SCATTER_PLOT_DEFAULT_MARGIN,
} from '../../../../constants/views/scatterPlotMatrix'

import { SCATTER_PLOT_MATRIX_TEXT } from '../../../../text/views-and-menus/scatterPlotMatrix'

import { useScatterPlotMatrixStyle } from '../../../../components-style/content/views/scatter-plot/useScatterPlotMatrixStyle'

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

    const [xScale, yScale] = [
      scaleLinear(getCellInnerExtent(rect.width, SPACING.HORIZONTAL)),
      scaleLinear(getCellInnerExtent(rect.height, SPACING.VERTICAL)),
    ]

    const [xAxis, yAxis] = [axisBottom(xScale), axisLeft(yScale)]
    xAxis.ticks(TICKS.X).tickSize(innerHeight)
    yAxis.ticks(TICKS.Y).tickSize(-innerWidth)

    const setAxis =
      (a: ScaleLinear<number, number>, axis: Axis<NumberValue>): DataEachG<keyof SelectableDataType> =>
      (attribute, index, elements) => {
        a.domain(extentInDomains[attribute])
        select(elements[index]).call(axis)
      }
    const getTransformX: DataEachG<keyof SelectableDataType, string> = (attribute, idx) =>
      getTranslate([(attributesCount - 1 - idx) * rect.width, 0])
    const getTransformY: DataEachG<keyof SelectableDataType, string> = (attribute, idx) =>
      getTranslate([0, idx * rect.height])

    // axes on X (vertical)
    svg
      .selectAll(AXIS_X)
      .data(displayAttributes)
      .enter()
      .append(SVG.elements.g)
      .attr(SVG.attributes.class, clsx(classes.x, classes.axis))
      .attr(SVG.attributes.transform, getTransformX)
      .each(setAxis(xScale, xAxis))

    // axes on Y (horizontal)
    svg
      .selectAll(AXIS_Y)
      .data(displayAttributes)
      .enter()
      .append(SVG.elements.g)
      .attr(SVG.attributes.class, clsx(classes.y, classes.axis))
      .attr(SVG.attributes.transform, getTransformY)
      .each(setAxis(yScale, yAxis))

    const plotMatrixItem: DataEachG<MatrixItem> = (matrixItem, idx, elements) => {
      // set domains
      xScale.domain(extentInDomains[matrixItem.rowKey])
      yScale.domain(extentInDomains[matrixItem.colKey])

      const cell = select(elements[idx])
      const getCx: DataEachCircle<SelectableDataType, number> = (data) => xScale(Number(data[matrixItem.rowKey]))
      const getCy: DataEachCircle<SelectableDataType, number> = (data) => yScale(Number(data[matrixItem.colKey]))

      // make rectangle surrounding data
      cell
        .append(SVG.elements.rect)
        .attr(SVG.attributes.class, classes.rect)
        .attr(SVG.attributes.x, SPACING.HORIZONTAL)
        .attr(SVG.attributes.y, SPACING.VERTICAL)
        .attr(SVG.attributes.width, getCellInnerSize(rect.width, SPACING.HORIZONTAL))
        .attr(SVG.attributes.height, getCellInnerSize(rect.height, SPACING.VERTICAL))

      // make data points
      cell
        .selectAll(DATA_POINT)
        .data(dataset)
        .enter()
        .append(SVG.elements.circle)
        .attr(SVG.attributes.cx, getCx)
        .attr(SVG.attributes.cy, getCy)
        .attr(SVG.attributes.r, dataPointSize)
        .attr(SVG.attributes.class, classes.dataPoint)
        .style(SVG.style.fill, getCategoryColor(categoryAttribute, color))
    }

    const cell = svg
      .selectAll(CELL)
      .data(getMatrix(displayAttributes))
      .enter()
      .append(SVG.elements.g)
      .attr(SVG.attributes.class, classes.cell)
      .attr(SVG.attributes.transform, getCellTranslateInMatrix(rect, attributesCount - 1))
      .each(plotMatrixItem)

    // add labels to diagonal
    cell
      .filter((matrixItem) => matrixItem.rowIdx === matrixItem.colIdx)
      .append(SVG.elements.text)
      .attr(SVG.attributes.x, 3 * SPACING.HORIZONTAL)
      .attr(SVG.attributes.y, 3 * SPACING.VERTICAL)
      .text(getAttributeFromMatrixFormatted)

    const brushing: { cell: MatrixPosition | null } = {
      cell: null,
    }

    const clearBrush = () => {
      cell.each((d, idx, elements) => {
        brush().clear(select(elements[idx]))
      })
    }

    const setBrushingSelection = ({ rowKey, colKey }: MatrixItem, selection: BrushSelection2d) => {
      if (selection) {
        setDataSelected((data) => isInRanges(selection, xScale(Number(data[rowKey])), yScale(Number(data[colKey]))))
      }
    }

    const makeBrush = brush<MatrixItem>()
      .on(BrushAction.start, (_: D3BrushEvent<SelectableDataType>, { rowIdx, colIdx, rowKey, colKey }: MatrixItem) => {
        setComponentBrushing(ViewType.ScatterPlotMatrix)
        if (!brushing.cell || brushing.cell.rowIdx !== rowIdx || brushing.cell.colIdx !== colIdx) {
          clearBrush()
          brushing.cell = { rowIdx, colIdx }
          xScale.domain(extentInDomains[rowKey])
          yScale.domain(extentInDomains[colKey])
        }
      })
      .on(BrushAction.move, ({ selection }: D3BrushEvent<SelectableDataType>, matrixItem: MatrixItem) => {
        const brushSelection = selection as BrushSelection2d
        setBrushingSelection(matrixItem, brushSelection)
      })
      .on(BrushAction.end, ({ selection }: D3BrushEvent<SelectableDataType>, matrixItem: MatrixItem) => {
        const brushSelection = selection as BrushSelection2d
        setBrushingSelection(matrixItem, brushSelection)
        if (!brushSelection) {
          setComponentBrushing(null)
          setDataSelected((data) => (data.selected = false))
        }
      })
      .extent([
        [0, 0],
        [rect.width, rect.height],
      ])

    registerCleanBrushing(() => {
      clearBrush()
      brushing.cell = null
    })

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

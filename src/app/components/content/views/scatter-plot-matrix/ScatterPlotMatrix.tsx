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
import { ScatterPlotMatrixSettings } from '../../../../types/views/scatter-plot-matrix/ScatterPlotMatrixSettings'
import { Margin } from '../../../../types/styling/Margin'
import { Dimensions } from '../../../../types/basic/dimensions'
import { MatrixItem, MatrixPosition } from '../../../../types/data/MatrixData'
import { BrushSelection2d } from '../../../../types/brushing/BrushSelection'
import { DataEachCircle, DataEachG } from '../../../../types/d3-types'

import {
  getAttributeFromMatrixFormatted,
  getAttributeValuesWithLabel,
  getClass,
  getEverything,
  getTranslate,
  px,
} from '../../../../helpers/d3/stringGetters'
import { getExtentInDomains } from '../../../../helpers/d3/extent'
import {
  getCellInnerExtent,
  getCellInnerSize,
  getCellTranslateInMatrix,
  getMatrix,
} from '../../../../helpers/d3/matrix'
import { isInRanges } from '../../../../helpers/basic/range'
import { getCategoryColor } from '../../../../helpers/d3/attributeGetters'
import { displayDetails } from '../../../../helpers/d3/displayDetails'

import { BrushAction } from '../../../../constants/actions/BrushAction'
import { ViewType } from '../../../../constants/views/ViewTypes'
import { SVG } from '../../../../constants/svg'
import { MIN_SCATTER_PLOT_MATRIX_ATTRIBUTE_COUNT } from '../../../../constants/views/scatterPlotMatrix'
import { MouseActions } from '../../../../constants/actions/MouseActions'
import { TOOLTIP } from '../../../../constants/views/tooltip'
import { HTML } from '../../../../constants/html'

import { SCATTER_PLOT_MATRIX_TEXT } from '../../../../text/views-and-menus/scatterPlotMatrix'

import { useScatterPlotMatrixStyle } from '../../../../components-style/content/views/scatter-plot-matrix/useScatterPlotMatrixStyle'
import { useTooltipStyle } from '../../../../components-style/content/views/useTooltipStyle'
import { SAVE_ID } from '../../../../constants/save/save'

export interface ScatterPlotMatrixProps extends VisualizationView, Brushable, ScatterPlotMatrixSettings {}

export const DATA_POINT = `dataPoint`
export const AXIS_X = `axisX`
export const AXIS_Y = `axisY`
export const CELL = `cell`
export const CELL_DUPLICATES = `cell-dup`
export const SPACING = {
  HORIZONTAL: 12,
  VERTICAL: 12,
}
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
  isDetailsVisible,
  isBrushingOnEndOfMove,
  colorCategory,
  pointSize,
  margins,
  opacity,
}) => {
  const margin = useMemo(() => new Margin(...margins), [margins])
  const classes = useScatterPlotMatrixStyle({ width, height, margin, opacity })
  const { tooltip: tooltipClass } = useTooltipStyle()
  const component = useRef<SVGGElement>(null)
  const color = scaleOrdinal(colorCategory)

  const [innerWidth, innerHeight] = [width - margin.width, height - margin.height]

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

    // axes on X (horizontal)
    svg
      .selectAll(AXIS_X)
      .data(displayAttributes)
      .enter()
      .append(SVG.elements.g)
      .attr(SVG.attributes.class, clsx(classes.x, classes.axis))
      .attr(SVG.attributes.transform, getTransformX)
      .each(setAxis(xScale, xAxis))

    // axes on Y (vertical)
    svg
      .selectAll(AXIS_Y)
      .data(displayAttributes)
      .enter()
      .append(SVG.elements.g)
      .attr(SVG.attributes.class, clsx(classes.y, classes.axis))
      .attr(SVG.attributes.transform, getTransformY)
      .each(setAxis(yScale, yAxis))

    const tooltip = select(getClass(tooltipClass))
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
        .attr(SVG.attributes.r, pointSize)
        .attr(SVG.attributes.class, clsx(classes.dataPoint, DATA_POINT))
        .on(MouseActions.mouseOver, ({ clientX, clientY }: MouseEvent, data: SelectableDataType) => {
          tooltip.transition().duration(TOOLTIP.EASE_IN).style(SVG.style.opacity, TOOLTIP.VISIBLE)
          tooltip
            .html(getAttributeValuesWithLabel(data).join(HTML.newLine))
            .style(SVG.style.left, px(clientX))
            .style(SVG.style.top, px(clientY))
        })
        .on(MouseActions.mouseOut, () => {
          tooltip.transition().duration(TOOLTIP.EASE_OUT).style(SVG.style.opacity, TOOLTIP.INVISIBLE)
        })
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
      .attr(SVG.attributes.y, 2.5 * SPACING.VERTICAL)
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
        if (!isBrushingOnEndOfMove) {
          const brushSelection = selection as BrushSelection2d
          setBrushingSelection(matrixItem, brushSelection)
        }
      })
      .on(BrushAction.end, ({ selection }: D3BrushEvent<SelectableDataType>, matrixItem: MatrixItem) => {
        const brushSelection = selection as BrushSelection2d
        setBrushingSelection(matrixItem, brushSelection)
        if (!brushSelection) {
          setComponentBrushing(null)
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

    // make points in second layer so details can be displayed
    svg
      .selectAll(CELL_DUPLICATES)
      .data(getMatrix(displayAttributes))
      .enter()
      .append(SVG.elements.g)
      .attr(SVG.attributes.class, clsx(classes.cell, classes.duplicates))
      .attr(SVG.attributes.transform, getCellTranslateInMatrix(rect, attributesCount - 1))
      .each(plotMatrixItem)
  }, [
    dataset,
    innerWidth,
    innerHeight,
    setDataSelected,
    categoryAttribute,
    displayAttributes,
    setComponentBrushing,
    registerCleanBrushing,
    isBrushingOnEndOfMove,
    pointSize,
    color,
    classes,
    tooltipClass,
  ])

  useEffect(
    () => createScatterPlotMatrix(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [displayAttributes, categoryAttribute, innerWidth, innerHeight, pointSize, isBrushingOnEndOfMove, colorCategory],
  )

  selectAll(getClass(DATA_POINT))
    .classed(classes.selected, (d) => (d as SelectableDataType).selected)
    .classed(classes.hidden, (d) => isBrushingActive && !(d as SelectableDataType).selected)

  displayDetails(isDetailsVisible, tooltipClass)
  displayDetails(isDetailsVisible, classes.duplicates)

  if (displayAttributes.length >= MIN_SCATTER_PLOT_MATRIX_ATTRIBUTE_COUNT) {
    return (
      <>
        <svg
          width={width}
          height={height}
          className={classes[ViewType.ScatterPlotMatrix]}
          id={SAVE_ID[ViewType.ScatterPlotMatrix]}
        >
          <g ref={component} transform={getTranslate([margin.left, margin.top])} />
        </svg>
        <div className={tooltipClass} />
      </>
    )
  }
  return <div className={classes.notDisplayed}>{SCATTER_PLOT_MATRIX_TEXT.unavailable}</div>
}

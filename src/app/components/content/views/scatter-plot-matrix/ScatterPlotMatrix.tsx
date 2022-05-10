import { VoidFunctionComponent, useCallback, useEffect, useMemo, useRef } from 'react'
import {
  Axis,
  axisBottom,
  axisLeft,
  brush,
  NumberValue,
  ScaleLinear,
  scaleLinear,
  scaleOrdinal,
  select,
  selectAll,
} from 'd3'
import { Box } from '@mui/material'

import { SelectableDataType } from '../../../../types/data/data'
import { VisualizationView } from '../../../../types/views/VisualizationView'
import { Brushable } from '../../../../types/brushing/Brushable'
import { ScatterPlotMatrixSettings } from '../../../../types/views/settings/ScatterPlotMatrixSettings'
import { Margin } from '../../../../types/styling/Margin'
import { Dimensions } from '../../../../types/basic/dimensions'
import { MatrixItem, MatrixPosition } from '../../../../types/data/MatrixData'
import { BrushSelection2d } from '../../../../types/brushing/BrushSelection'
import { Extent, DataEachC, DataEachG, OnBrushEvent } from '../../../../types/d3-types'

import {
  getAttributeFromMatrixFormatted,
  getAttributeValuesWithLabel,
  getClass,
  getEverything,
  getTranslate,
} from '../../../../helpers/stringGetters'
import { getExtentInDomains } from '../../../../helpers/d3/extent'
import { getCellInnerSize, getCellTranslateInMatrix, getMatrix } from '../../../../helpers/views/matrix'
import { isInRanges } from '../../../../helpers/basic/range'
import { getCategoryColor } from '../../../../helpers/d3/categoryColor'
import { setDisplay } from '../../../../helpers/d3/setDisplay'
import { onMouseOutTooltip, onMouseOverTooltip } from '../../../../helpers/d3/tooltip'

import { BrushAction } from '../../../../constants/actions/BrushAction'
import { ViewType } from '../../../../constants/views-general/ViewType'
import { SVG } from '../../../../constants/svg'
import { MIN_SCATTER_PLOT_MATRIX_ATTRIBUTE_COUNT } from '../../../../constants/views/scatterPlotMatrix'
import { MouseAction } from '../../../../constants/actions/MouseAction'
import { CONTAINER_EMPTY, CONTAINER_SAVE_ID, SAVE_ID } from '../../../../constants/save/save'

import { SCATTER_PLOT_MATRIX_TEXT } from '../../../../text/views-and-menus/scatterPlotMatrix'

import { PLOT_FONT_BOX_SIZE } from '../../../../styles/font'

import {
  AXIS_CLASS,
  getScatterPlotMatrixStyle,
  DATA_POINT_CLASS,
  RECT_CLASS,
  SELECTED_CLASS,
  DUPLICATES_CLASS,
  CELL_CLASS,
} from '../../../../components-style/content/views/scatter-plot-matrix/scatterPlotMatrixStyle'
import { getViewsNotDisplayStyle } from '../../../../components-style/content/views/getViewsNotDisplayStyle'

export interface ScatterPlotMatrixProps extends VisualizationView, Brushable, ScatterPlotMatrixSettings {}

type CellBrushing = { cell: MatrixPosition | null }

export const DATA_POINT = `DATA_POINT`
export const AXIS_X = `AXIS_X`
export const AXIS_Y = `AXIS_Y`
export const CELL = `CELL`
export const CELL_DUPLICATES = `CELL_DUPLICATES`

export const TICKS = {
  X: 6,
  Y: 6,
}

export const ScatterPlotMatrix: VoidFunctionComponent<ScatterPlotMatrixProps> = ({
  width,
  height,
  dataset,
  refreshViews,
  displayAttributes,
  categoryAttribute,
  registerCleanBrushing,
  setComponentBrushing,
  isBrushingActive,
  isDetailsVisible,
  isBrushingOnEndOfMove,
  colorCategory,
  pointSize,
  horizontalSpacing,
  verticalSpacing,
  margins,
  opacity,
  brushColor,
}) => {
  const margin = useMemo(() => new Margin(...margins), [margins])
  const component = useRef<SVGGElement>(null)
  const color = scaleOrdinal(colorCategory)

  const [innerWidth, innerHeight] = [width - margin.width, height - margin.height]

  // selected coloring
  selectAll(getClass(DATA_POINT_CLASS)).classed(SELECTED_CLASS, (d) => (d as SelectableDataType).selected)

  setDisplay(isDetailsVisible, DUPLICATES_CLASS)

  const createScatterPlotMatrix = useCallback(() => {
    const node = component.current
    if (!node) return
    const svg = select(node)
    svg.selectAll(getEverything()).remove() // clear

    const attributesCount = displayAttributes.length
    const rect: Dimensions = {
      width: innerWidth / attributesCount,
      height: innerHeight / attributesCount,
    }
    if (getCellInnerSize(rect.width, horizontalSpacing) < 0 || getCellInnerSize(rect.height, verticalSpacing) < 0)
      return // rect not big enough

    const extentInDomains = getExtentInDomains(displayAttributes, dataset)

    const [xScale, yScale] = [
      scaleLinear([horizontalSpacing, rect.width - horizontalSpacing]),
      scaleLinear([rect.height - verticalSpacing, verticalSpacing]),
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
      .attr(SVG.attributes.class, AXIS_CLASS)
      .attr(SVG.attributes.transform, getTransformX)
      .each(setAxis(xScale, xAxis))

    // axes on Y (vertical)
    svg
      .selectAll(AXIS_Y)
      .data(displayAttributes)
      .enter()
      .append(SVG.elements.g)
      .attr(SVG.attributes.class, AXIS_CLASS)
      .attr(SVG.attributes.transform, getTransformY)
      .each(setAxis(yScale, yAxis))

    const plotMatrixItem: DataEachG<MatrixItem> = (matrixItem, idx, elements) => {
      // set domains
      xScale.domain(extentInDomains[matrixItem.rowKey])
      yScale.domain(extentInDomains[matrixItem.colKey])

      const cell = select(elements[idx])
      const getCx: DataEachC<SelectableDataType, number> = (data) => xScale(Number(data[matrixItem.rowKey]))
      const getCy: DataEachC<SelectableDataType, number> = (data) => yScale(Number(data[matrixItem.colKey]))

      // make rectangle surrounding data
      cell
        .append(SVG.elements.rect)
        .attr(SVG.attributes.class, RECT_CLASS)
        .attr(SVG.attributes.x, horizontalSpacing)
        .attr(SVG.attributes.y, verticalSpacing)
        .attr(SVG.attributes.width, getCellInnerSize(rect.width, horizontalSpacing))
        .attr(SVG.attributes.height, getCellInnerSize(rect.height, verticalSpacing))

      // make data points
      cell
        .selectAll(DATA_POINT)
        .data(dataset)
        .enter()
        .append(SVG.elements.circle)
        .attr(SVG.attributes.cx, getCx)
        .attr(SVG.attributes.cy, getCy)
        .attr(SVG.attributes.r, pointSize)
        .attr(SVG.attributes.class, DATA_POINT_CLASS)
        .on(MouseAction.mouseOver, onMouseOverTooltip(getAttributeValuesWithLabel))
        .on(MouseAction.mouseOut, onMouseOutTooltip)
        .style(SVG.style.fill, getCategoryColor(categoryAttribute, color))
    }

    const cell = svg
      .selectAll(CELL)
      .data(getMatrix(displayAttributes))
      .enter()
      .append(SVG.elements.g)
      .attr(SVG.attributes.class, CELL_CLASS)
      .attr(SVG.attributes.transform, getCellTranslateInMatrix(rect, attributesCount - 1))
      .each(plotMatrixItem)

    // add labels to diagonal
    cell
      .filter((matrixItem) => matrixItem.rowIdx === matrixItem.colIdx)
      .append(SVG.elements.text)
      .attr(SVG.attributes.x, 1.5 * horizontalSpacing)
      .attr(SVG.attributes.y, verticalSpacing + PLOT_FONT_BOX_SIZE)
      .text(getAttributeFromMatrixFormatted)

    const brushing: CellBrushing = {
      cell: null,
    }

    const clearBrush = () => {
      cell.each((d, idx, elements) => {
        brush().clear(select(elements[idx]))
      })
    }

    const setBrushingSelection = ({ rowKey, colKey }: MatrixItem, selection: BrushSelection2d) => {
      if (selection) {
        dataset.forEach(
          (data) => (data.selected = isInRanges(selection, xScale(Number(data[rowKey])), yScale(Number(data[colKey])))),
        )
        refreshViews()
      }
    }

    const onBrush: Record<BrushAction, OnBrushEvent<SelectableDataType, MatrixItem>> = {
      [BrushAction.start]: (_, { rowIdx, colIdx, rowKey, colKey }) => {
        setComponentBrushing(ViewType.ScatterPlotMatrix)
        if (!brushing.cell || brushing.cell.rowIdx !== rowIdx || brushing.cell.colIdx !== colIdx) {
          clearBrush()
          brushing.cell = { rowIdx, colIdx }
          xScale.domain(extentInDomains[rowKey])
          yScale.domain(extentInDomains[colKey])
        }
      },
      [BrushAction.move]: ({ selection }, matrixItem) => {
        if (!isBrushingOnEndOfMove) {
          const brushSelection = selection as BrushSelection2d
          setBrushingSelection(matrixItem, brushSelection)
        }
      },
      [BrushAction.end]: ({ selection }, matrixItem) => {
        const brushSelection = selection as BrushSelection2d
        setBrushingSelection(matrixItem, brushSelection)
        if (!brushSelection) {
          setComponentBrushing(null)
        }
      },
    }
    const brushExtent: Extent = [
      [0, 0],
      [rect.width, rect.height],
    ]

    const makeBrush = brush<MatrixItem>()
      .on(BrushAction.start, onBrush[BrushAction.start])
      .on(BrushAction.move, onBrush[BrushAction.move])
      .on(BrushAction.end, onBrush[BrushAction.end])
      .extent(brushExtent)

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
      .attr(SVG.attributes.class, DUPLICATES_CLASS)
      .attr(SVG.attributes.transform, getCellTranslateInMatrix(rect, attributesCount - 1))
      .each(plotMatrixItem)

    // selected coloring
    selectAll(getClass(DATA_POINT_CLASS)).classed(SELECTED_CLASS, (d) => (d as SelectableDataType).selected)
  }, [
    dataset,
    innerWidth,
    innerHeight,
    horizontalSpacing,
    verticalSpacing,
    refreshViews,
    categoryAttribute,
    displayAttributes,
    setComponentBrushing,
    registerCleanBrushing,
    isBrushingOnEndOfMove,
    pointSize,
    color,
  ])

  useEffect(
    () => createScatterPlotMatrix(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      displayAttributes,
      categoryAttribute,
      innerWidth,
      innerHeight,
      pointSize,
      horizontalSpacing,
      verticalSpacing,
      isBrushingOnEndOfMove,
      colorCategory,
    ],
  )

  if (innerWidth < 0 || innerHeight < 0) return <Box />
  if (
    getCellInnerSize(innerWidth / displayAttributes.length, horizontalSpacing) < 0 ||
    getCellInnerSize(innerHeight / displayAttributes.length, verticalSpacing) < 0
  )
    return (
      <Box sx={getViewsNotDisplayStyle(width, height, margin)} id={CONTAINER_EMPTY[ViewType.ScatterPlotMatrix]}>
        {SCATTER_PLOT_MATRIX_TEXT.tooSmall}
      </Box>
    )
  if (displayAttributes.length >= MIN_SCATTER_PLOT_MATRIX_ATTRIBUTE_COUNT) {
    return (
      <Box
        sx={getScatterPlotMatrixStyle(opacity, isBrushingActive, brushColor)}
        id={CONTAINER_SAVE_ID[ViewType.ScatterPlotMatrix]}
      >
        <svg width={width} height={height} id={SAVE_ID[ViewType.ScatterPlotMatrix]}>
          <g ref={component} transform={getTranslate([margin.left, margin.top])} />
        </svg>
      </Box>
    )
  }
  return (
    <Box sx={getViewsNotDisplayStyle(width, height, margin)} id={CONTAINER_EMPTY[ViewType.ScatterPlotMatrix]}>
      {SCATTER_PLOT_MATRIX_TEXT.unavailable}
    </Box>
  )
}

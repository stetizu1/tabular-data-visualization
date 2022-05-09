import { VoidFunctionComponent, useCallback, useEffect, useMemo, useRef } from 'react'
import { Box } from '@mui/material'
import { axisLeft, brushY, line, scaleLinear, scaleOrdinal, scalePoint, select, selectAll } from 'd3'

import { SelectableDataType } from '../../../../types/data/data'
import { Brushable } from '../../../../types/brushing/Brushable'
import { BrushSelection1d } from '../../../../types/brushing/BrushSelection'
import { VisualizationView } from '../../../../types/views/VisualizationView'
import { ParallelCoordinatesSettings } from '../../../../types/views/settings/ParallelCoordinatesSettings'
import { Margin } from '../../../../types/styling/Margin'
import { Extent, DataEachG, DataEachP, OnBrushEvent } from '../../../../types/d3-types'

import { toStringArray } from '../../../../helpers/basic/retype'
import { isInRange } from '../../../../helpers/basic/range'
import { getExtentInDomains } from '../../../../helpers/d3/extent'
import { getDefaultSelectionForAttributes } from '../../../../helpers/data/data'
import { getCategoryColor, getTextTogglingYShift, TOGGLE_TEXT_Y_SHIFT } from '../../../../helpers/d3/attributeGetters'
import {
  getAttributeFormatted,
  getAttributeValuesWithLabel,
  getClass,
  getEverything,
  getTranslate,
} from '../../../../helpers/d3/stringGetters'
import { onMouseOutTooltip, onMouseOverTooltip } from '../../../../helpers/d3/tooltip'

import { BrushAction } from '../../../../constants/actions/BrushAction'
import { ViewType } from '../../../../constants/views/ViewType'
import { SVG } from '../../../../constants/svg'
import { MIN_PARALLEL_COORDINATES_ATTRIBUTE_COUNT } from '../../../../constants/views/parallelCoordinates'
import { MouseAction } from '../../../../constants/actions/MouseAction'
import { CONTAINER_EMPTY, CONTAINER_SAVE_ID, SAVE_ID } from '../../../../constants/save/save'

import { PARALLEL_COORDINATES_TEXT } from '../../../../text/views-and-menus/parallelCoordinates'

import { PLOT_FONT_BOX_SIZE } from '../../../../styles/font'

import {
  AXES_TEXT_CLASS,
  getParallelCoordinatesStyle,
  PARALLEL_COORDINATES_CLASS,
  SELECTED_CLASS,
} from '../../../../components-style/content/views/parallel-coordinates/parallelCoordinatesStyle'
import { getViewsNotDisplayStyle } from '../../../../components-style/content/views/getViewsNotDisplayStyle'

const BRUSH_WIDTH = 30
const BRUSH_RADIUS = BRUSH_WIDTH / 2
const BRUSH_OVERLAP = 5

const AXES = `AXES`
export const PARALLEL_COORDINATES = `PARALLEL_COORDINATES`

export interface ParallelCoordinatesProps extends VisualizationView, Brushable, ParallelCoordinatesSettings {}

export const ParallelCoordinates: VoidFunctionComponent<ParallelCoordinatesProps> = ({
  width,
  height,
  dataset,
  displayAttributes,
  categoryAttribute,
  refreshViews,
  registerCleanBrushing,
  setComponentBrushing,
  isBrushingActive,
  isBrushingOnEndOfMove,
  colorCategory,
  lineWidth,
  margins,
  opacity,
  brushColor,
}) => {
  const margin = useMemo(() => new Margin(...margins), [margins])
  const component = useRef<SVGGElement>(null)
  const color = scaleOrdinal(colorCategory)
  const upperPadding = TOGGLE_TEXT_Y_SHIFT + PLOT_FONT_BOX_SIZE
  const [innerWidth, innerHeight] = [width - margin.width, height - margin.height - upperPadding]

  // selected coloring
  selectAll(getClass(PARALLEL_COORDINATES_CLASS)).classed(SELECTED_CLASS, (d) => (d as SelectableDataType).selected)

  const createParallelCoordinates = useCallback(() => {
    const node = component.current
    if (!node) return
    const svg = select(node)
    svg.selectAll(getEverything()).remove() // clear

    const extentInDomains = getExtentInDomains(displayAttributes, dataset)
    const xScale = scalePoint([0, innerWidth]).domain(toStringArray(displayAttributes))
    const yScales = displayAttributes.map((attribute) =>
      scaleLinear([innerHeight, 0]).domain(extentInDomains[attribute]),
    )

    const selections = getDefaultSelectionForAttributes(displayAttributes)

    const setBrushingSelection = () => {
      if (displayAttributes.every((dimension) => selections[dimension] === null)) {
        // check selections, if there is none in every line, false
        dataset.forEach((data) => (data.selected = false))
        refreshViews()
        return
      }
      dataset.forEach((data) => {
        data.selected = displayAttributes.every((dimension, idx) => {
          const selectedRange = selections[dimension]
          if (selectedRange === null) return true // nothing in dimension selected, do not block
          const valueOnAxis = yScales[idx](Number(data[dimension]))
          return isInRange(valueOnAxis, selectedRange)
        })
      })
      refreshViews()
    }

    const cleanBrushingSelection = () => {
      displayAttributes.forEach((key) => (selections[key] = null))
      setComponentBrushing(null)
    }

    const onBrush: Record<BrushAction, OnBrushEvent<SelectableDataType, keyof SelectableDataType>> = {
      [BrushAction.start]: () => setComponentBrushing(ViewType.ParallelCoordinates),
      [BrushAction.move]: (brushEvent, axisName) => {
        if (!isBrushingOnEndOfMove) {
          selections[axisName] = brushEvent.selection as BrushSelection1d
          setBrushingSelection()
        }
      },
      [BrushAction.end]: (brushEvent, axisName) => {
        selections[axisName] = brushEvent.selection as BrushSelection1d
        if (displayAttributes.some((key) => selections[key] !== null)) {
          return setBrushingSelection()
        }
        return cleanBrushingSelection() // nothing is selected
      },
    }
    const brushExtent: Extent = [
      [-BRUSH_RADIUS, -BRUSH_OVERLAP],
      [BRUSH_RADIUS, innerHeight + BRUSH_OVERLAP],
    ]

    const brush = brushY<keyof SelectableDataType>()
      .on(BrushAction.start, onBrush[BrushAction.start])
      .on(BrushAction.move, onBrush[BrushAction.move])
      .on(BrushAction.end, onBrush[BrushAction.end])
      .extent(brushExtent)

    const addAxes: DataEachG<keyof SelectableDataType> = (attribute, idx, elements) =>
      select(elements[idx]).call(axisLeft(yScales[idx]))

    const getDataLinePath: DataEachP<SelectableDataType, string | null> = (data) =>
      line()(
        displayAttributes.map((attribute, idx) => [xScale(String(attribute))!, yScales[idx](Number(data[attribute]))]),
      )

    // plot data
    svg
      .selectAll(PARALLEL_COORDINATES)
      .data(dataset)
      .enter()
      .append(SVG.elements.path)
      .attr(SVG.attributes.d, getDataLinePath)
      .attr(SVG.attributes.class, PARALLEL_COORDINATES_CLASS)
      .attr(SVG.attributes.strokeWidth, lineWidth)

      .on(MouseAction.mouseOver, onMouseOverTooltip(getAttributeValuesWithLabel))
      .on(MouseAction.mouseOut, onMouseOutTooltip)
      .style(SVG.style.stroke, getCategoryColor(categoryAttribute, color))

    const getAxisTransform: DataEachG<keyof SelectableDataType, string> = (attribute) =>
      getTranslate([xScale(String(attribute))!, 0])

    // plot axes, add brush
    const brushableAxes = svg
      .selectAll(AXES)
      .data(displayAttributes)
      .enter()
      .append(SVG.elements.g)
      .attr(SVG.attributes.transform, getAxisTransform)
      .each(addAxes)
      .call(brush)

    // add text to axes
    brushableAxes
      .append(SVG.elements.text)
      .attr(SVG.attributes.y, getTextTogglingYShift)
      .text(getAttributeFormatted)
      .attr(SVG.attributes.class, AXES_TEXT_CLASS)

    registerCleanBrushing(() => {
      brushableAxes.each((attribute, idx, elements) => {
        const axis = select(elements[idx])
        brushY().clear(axis)
      })
      Object.keys(selections).forEach((selLKey) => (selections[selLKey] = null))
    })

    // selected coloring
    selectAll(getClass(PARALLEL_COORDINATES_CLASS)).classed(SELECTED_CLASS, (d) => (d as SelectableDataType).selected)
  }, [
    dataset,
    innerWidth,
    innerHeight,
    refreshViews,
    setComponentBrushing,
    categoryAttribute,
    displayAttributes,
    registerCleanBrushing,
    isBrushingOnEndOfMove,
    lineWidth,
    color,
  ])

  useEffect(
    () => createParallelCoordinates(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [displayAttributes, categoryAttribute, innerWidth, innerHeight, lineWidth, isBrushingOnEndOfMove, colorCategory],
  )

  if (innerWidth < 0 || innerHeight < 0) return <Box />
  if (displayAttributes.length >= MIN_PARALLEL_COORDINATES_ATTRIBUTE_COUNT) {
    return (
      <Box
        sx={getParallelCoordinatesStyle(opacity, isBrushingActive, brushColor)}
        id={CONTAINER_SAVE_ID[ViewType.ParallelCoordinates]}
      >
        <svg width={width} height={height} id={SAVE_ID[ViewType.ParallelCoordinates]}>
          <g
            ref={component}
            width={innerWidth}
            height={innerHeight}
            transform={getTranslate([margin.left, margin.top + upperPadding])}
          />
        </svg>
      </Box>
    )
  }
  return (
    <Box sx={getViewsNotDisplayStyle(width, height, margin)} id={CONTAINER_EMPTY[ViewType.ParallelCoordinates]}>
      {PARALLEL_COORDINATES_TEXT.unavailable}
    </Box>
  )
}

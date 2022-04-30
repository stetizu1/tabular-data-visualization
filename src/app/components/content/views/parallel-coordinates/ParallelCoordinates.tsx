import { FunctionComponent, useCallback, useEffect, useMemo, useRef } from 'react'
import { axisLeft, brushY, D3BrushEvent, line, scaleLinear, scaleOrdinal, scalePoint, select, selectAll } from 'd3'
import clsx from 'clsx'

import { SelectableDataType } from '../../../../types/data/data'
import { Brushable } from '../../../../types/brushing/Brushable'
import { BrushSelection1d } from '../../../../types/brushing/BrushSelection'
import { VisualizationView } from '../../../../types/views/VisualizationView'
import { ParallelCoordinatesSettings } from '../../../../types/views/parallel-coordinates/ParallelCoordinatesSettings'
import { Margin } from '../../../../types/styling/Margin'
import { DataEachG } from '../../../../types/d3-types'

import { toStringArray } from '../../../../helpers/basic/retype'
import { isInRange } from '../../../../helpers/basic/range'
import { getExtentInDomains } from '../../../../helpers/d3/extent'
import { getDefaultSelectionForAttributes } from '../../../../helpers/data/data'
import { displayDetails } from '../../../../helpers/d3/displayDetails'
import { getCategoryColor } from '../../../../helpers/d3/attributeGetters'
import {
  getAttributeFormatted,
  getAttributeValuesWithLabel,
  getClass,
  getEverything,
  getTranslate,
  px,
} from '../../../../helpers/d3/stringGetters'

import { BrushAction } from '../../../../constants/actions/BrushAction'
import { ViewType } from '../../../../constants/views/ViewTypes'
import { SVG } from '../../../../constants/svg'
import { MIN_PARALLEL_COORDINATES_ATTRIBUTE_COUNT } from '../../../../constants/views/parallelCoordinates'
import { MouseActions } from '../../../../constants/actions/MouseActions'
import { TOOLTIP } from '../../../../constants/views/tooltip'
import { HTML } from '../../../../constants/html'

import { PARALLEL_COORDINATES_TEXT } from '../../../../text/views-and-menus/parallelCoordinates'

import { useParallelCoordinatesStyle } from '../../../../components-style/content/views/parallel-coordinates/useParallelCoordinatesStyle'
import { useTooltipStyle } from '../../../../components-style/content/views/useTooltipStyle'

import { PLOT_FONT_BOX_SIZE } from '../../../../styles/font'
import { SAVE_ID } from '../../../../constants/save/save'

const BRUSH_WIDTH = 30
const BRUSH_RADIUS = BRUSH_WIDTH / 2
const BRUSH_OVERLAP = 5
const TEXT_Y_SHIFT = 10

const PARALLEL_COORDINATES = `PARALLEL_COORDINATES`
const AXES = `AXES`

export interface ParallelCoordinatesProps extends VisualizationView, Brushable, ParallelCoordinatesSettings {}

export const ParallelCoordinates: FunctionComponent<ParallelCoordinatesProps> = ({
  width,
  height,
  dataset,
  displayAttributes,
  categoryAttribute,
  setDataSelected,
  registerCleanBrushing,
  setComponentBrushing,
  isBrushingActive,
  isDetailsVisible,
  isBrushingOnEndOfMove,
  colorCategory,
  lineWidth,
  margins,
  opacity,
}) => {
  const margin = useMemo(() => new Margin(...margins), [margins])
  const classes = useParallelCoordinatesStyle({ width, height, margin, opacity })
  const { tooltip: tooltipClass } = useTooltipStyle()
  const component = useRef<SVGGElement>(null)
  const color = scaleOrdinal(colorCategory)
  const upperPadding = TEXT_Y_SHIFT + PLOT_FONT_BOX_SIZE
  const [innerWidth, innerHeight] = [width - margin.width, height - margin.height - upperPadding]

  // selected coloring
  selectAll(getClass(PARALLEL_COORDINATES))
    .classed(classes.selected, (d) => (d as SelectableDataType).selected)
    .classed(classes.hidden, (d) => isBrushingActive && !(d as SelectableDataType).selected)

  const createParallelCoordinates = useCallback(() => {
    const node = component.current!
    const svg = select(node)
    svg.selectAll(getEverything()).remove() // clear

    const extentInDomains = getExtentInDomains(displayAttributes, dataset)
    const xScale = scalePoint([0, innerWidth]).domain(toStringArray(displayAttributes))
    const yScales = displayAttributes.map((attribute) =>
      scaleLinear([innerHeight, 0]).domain(extentInDomains[attribute]),
    )

    const selections = getDefaultSelectionForAttributes(displayAttributes)

    const setBrushingSelection = () => {
      setDataSelected((data) =>
        displayAttributes.every((dimension, idx) => {
          const selectedRange = selections[dimension]
          if (selectedRange === null) return true // nothing in dimension selected, do not block
          const valueOnAxis = yScales[idx](Number(data[dimension]))
          return isInRange(valueOnAxis, selectedRange)
        }),
      )
    }

    const cleanBrushingSelection = () => {
      displayAttributes.forEach((key) => (selections[key] = null))
      setDataSelected(() => false)
      setComponentBrushing(null)
    }

    const brush = brushY<keyof SelectableDataType>()
      .extent([
        [-BRUSH_RADIUS, -BRUSH_OVERLAP],
        [BRUSH_RADIUS, innerHeight + BRUSH_OVERLAP],
      ])
      .on(BrushAction.start, () => {
        setComponentBrushing(ViewType.ParallelCoordinates)
      })
      .on(BrushAction.move, (brushEvent: D3BrushEvent<SelectableDataType>, axisName) => {
        if (!isBrushingOnEndOfMove) {
          selections[axisName] = brushEvent.selection as BrushSelection1d
          setBrushingSelection()
        }
      })
      .on(BrushAction.end, (brushEvent: D3BrushEvent<SelectableDataType>, axisName) => {
        selections[axisName] = brushEvent.selection as BrushSelection1d
        if (displayAttributes.some((key) => selections[key] !== null)) {
          return setBrushingSelection()
        }
        return cleanBrushingSelection() // nothing is selected
      })

    const getAxisTransform = (attribute: keyof SelectableDataType) => getTranslate([xScale(String(attribute))!, 0])
    const addAxes: DataEachG<keyof SelectableDataType> = (attribute, idx, elements) =>
      select(elements[idx]).call(axisLeft(yScales[idx]))

    const getDataLinePath = (data: SelectableDataType) =>
      line()(
        displayAttributes.map((attribute, idx) => [xScale(String(attribute))!, yScales[idx](Number(data[attribute]))]),
      )

    const tooltip = select(getClass(tooltipClass))
    // plot data
    svg
      .selectAll(PARALLEL_COORDINATES)
      .data(dataset)
      .enter()
      .append(SVG.elements.path)
      .attr(SVG.attributes.d, getDataLinePath)
      .attr(SVG.attributes.class, clsx(classes.line, PARALLEL_COORDINATES))
      .attr(SVG.attributes.strokeWidth, lineWidth)

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
      .style(SVG.style.stroke, getCategoryColor(categoryAttribute, color))

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
      .attr(SVG.attributes.y, -TEXT_Y_SHIFT)
      .text(getAttributeFormatted)
      .attr(SVG.attributes.class, classes.text)

    registerCleanBrushing(() => {
      brushableAxes.each((attribute, idx, elements) => {
        const axis = select(elements[idx])
        brushY().clear(axis)
      })
      displayAttributes.forEach((key) => (selections[key] = null))
    })
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
    lineWidth,
    color,
    classes,
    tooltipClass,
  ])

  useEffect(
    () => createParallelCoordinates(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [displayAttributes, categoryAttribute, innerWidth, innerHeight, lineWidth, isBrushingOnEndOfMove, colorCategory],
  )
  displayDetails(isDetailsVisible, tooltipClass)

  if (displayAttributes.length >= MIN_PARALLEL_COORDINATES_ATTRIBUTE_COUNT) {
    return (
      <>
        <svg
          width={width}
          height={height}
          className={classes[ViewType.ParallelCoordinates]}
          id={SAVE_ID[ViewType.ParallelCoordinates]}
        >
          <g
            ref={component}
            width={innerWidth}
            height={innerHeight}
            transform={getTranslate([margin.left, margin.top + upperPadding])}
          />
        </svg>
        <div className={tooltipClass} />
      </>
    )
  }
  return <div className={classes.notDisplayed}>{PARALLEL_COORDINATES_TEXT.unavailable}</div>
}

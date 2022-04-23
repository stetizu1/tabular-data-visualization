import { FunctionComponent, useCallback, useEffect, useRef } from 'react'
import { axisLeft, brushY, D3BrushEvent, line, scaleLinear, scaleOrdinal, scalePoint, select, selectAll } from 'd3'

import { SelectableDataType } from '../../../../types/data/data'
import { Brushable } from '../../../../types/brushing/Brushable'
import { BrushAction } from '../../../../types/brushing/BrushAction'
import { BrushSelection2d } from '../../../../types/brushing/BrushSelection'
import { VisualizationView } from '../../../../types/views/VisualizationView'
import { ParallelCoordinatesSettings } from '../../../../types/views/parallelCoordinates/ParallelCoordinatesSettings'

import { toStringArray } from '../../../../helpers/basic/retype'
import { inRange } from '../../../../helpers/basic/numerical'
import { GET_EVERYTHING, getAttributesFormatted, getClass, getTranslate } from '../../../../helpers/d3/stringSetters'
import { getExtentInDomains } from '../../../../helpers/d3/extent'
import { getDefaultSelectionForAttributes } from '../../../../helpers/data/data'

import { defaultMargin } from '../../../../constants/defaultMargin'

import { PLOT_COLORS } from '../../../../styles/colors'
import { PLOT_FONT, PLOT_FONT_BOX_SIZE } from '../../../../styles/font'

import { SVG } from '../../../../constants/svg'
import { MIN_PARALLEL_COORDINATES_ATTRIBUTE_COUNT } from '../../../../constants/views/parallelCoordinates'

import { PARALLEL_COORDINATES_TEXT } from '../../../../text/viewsAndMenus/parallelCoordinates'

import { ViewType } from '../ViewTypes'

import { useParallelCoordinatesStyle } from './useParallelCoordinatesStyle'

const BRUSH_WIDTH = 30
const BRUSH_RADIUS = BRUSH_WIDTH / 2
const BRUSH_OVERLAP = 5
const TEXT_SPACING = {
  LEFT: 22,
  RIGHT: 5,
}
const TEXT_Y_SHIFT = 10
const OPACITY = 0.5

const PARALLEL_COORDINATES = `PARALLEL_COORDINATES`
const AXES = `AXES`

export interface ParallelCoordinatesProps extends VisualizationView, Brushable, ParallelCoordinatesSettings {}

export const ParallelCoordinates: FunctionComponent<ParallelCoordinatesProps> = ({
  width,
  height,
  dataset,
  margin = defaultMargin,
  displayAttributes,
  categoryAttribute,
  setDataSelected,
  registerCleanBrushing,
  setComponentBrushing,
  isBrushingActive,
  colorCategory,
}) => {
  const classes = useParallelCoordinatesStyle({ width, height, margin })
  const component = useRef<SVGGElement>(null)
  const color = scaleOrdinal(colorCategory)
  const upperPadding = TEXT_Y_SHIFT + PLOT_FONT_BOX_SIZE
  const [innerWidth, innerHeight] = [
    width - margin.width - (TEXT_SPACING.LEFT + TEXT_SPACING.RIGHT),
    height - margin.height - upperPadding,
  ]

  // selected coloring
  selectAll(getClass(classes.line))
    .classed(classes.selected, (d) => (d as SelectableDataType).selected)
    .classed(classes.hidden, (d) => isBrushingActive && !(d as SelectableDataType).selected)

  const createParallelCoordinates = useCallback(() => {
    const node = component.current!
    const svg = select(node)
    svg.selectAll(GET_EVERYTHING).remove() // clear

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
          return inRange(valueOnAxis, selectedRange)
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
        selections[axisName] = brushEvent.selection as BrushSelection2d
        setBrushingSelection()
      })
      .on(BrushAction.end, (brushEvent: D3BrushEvent<SelectableDataType>, axisName) => {
        selections[axisName] = brushEvent.selection as BrushSelection2d
        if (displayAttributes.some((key) => selections[key] !== null)) {
          return setBrushingSelection()
        }
        return cleanBrushingSelection() // nothing is selected
      })

    const getAxisTransform = (attribute: keyof SelectableDataType) => getTranslate([xScale(String(attribute))!, 0])
    const addAxes = (
      attribute: keyof SelectableDataType,
      idx: number,
      elements: SVGGElement[] | ArrayLike<SVGGElement>,
    ) => select(elements[idx]).call(axisLeft(yScales[idx]))

    const getDataLinePath = (data: SelectableDataType) =>
      line()(
        displayAttributes.map((attribute, idx) => [xScale(String(attribute))!, yScales[idx](Number(data[attribute]))]),
      )
    const getDataLineColor = (data: SelectableDataType) =>
      categoryAttribute ? color(String(data[categoryAttribute])) : PLOT_COLORS.noCategoryColor

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
      .text(getAttributesFormatted)
      .style(SVG.style.textAnchor, PLOT_FONT.textAnchorMiddle)
      .style(SVG.style.fill, PLOT_COLORS.fontColor)
      .style(SVG.style.fontSize, PLOT_FONT.fontSize)

    // plot data
    svg
      .selectAll(PARALLEL_COORDINATES)
      .data(dataset)
      .enter()
      .append(SVG.elements.path)
      .attr(SVG.attributes.d, getDataLinePath)
      .attr(SVG.attributes.class, classes.line)
      .style(SVG.attributes.fill, SVG.values.none)
      .style(SVG.attributes.stroke, getDataLineColor)
      .style(SVG.attributes.opacity, OPACITY)

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
    classes,
    categoryAttribute,
    displayAttributes,
    setDataSelected,
    setComponentBrushing,
    registerCleanBrushing,
    color,
  ])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => createParallelCoordinates(), [displayAttributes, categoryAttribute])

  if (displayAttributes.length >= MIN_PARALLEL_COORDINATES_ATTRIBUTE_COUNT) {
    return (
      <svg width={width} height={height} className={classes.svg}>
        <g
          ref={component}
          width={innerWidth}
          height={innerHeight}
          transform={getTranslate([margin.left + TEXT_SPACING.LEFT, margin.top + upperPadding])}
        />
      </svg>
    )
  }
  return <div className={classes.notDisplayed}>{PARALLEL_COORDINATES_TEXT.unavailable}</div>
}

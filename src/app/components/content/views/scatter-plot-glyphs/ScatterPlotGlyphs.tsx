import { VoidFunctionComponent, useCallback, useEffect, useMemo, useRef } from 'react'
import { axisBottom, axisLeft, brush, lineRadial, scaleLinear, scaleOrdinal, scaleRadial, select, selectAll } from 'd3'
import { Box } from '@mui/material'

import { SelectableDataType } from '../../../../types/data/data'
import { VisualizationView } from '../../../../types/views/VisualizationView'
import { Brushable } from '../../../../types/brushing/Brushable'
import { ScatterPlotGlyphsSettings } from '../../../../types/views/settings/ScatterPlotGlyphsSettings'
import { Margin } from '../../../../types/styling/Margin'
import { BrushSelection2d } from '../../../../types/brushing/BrushSelection'

import {
  getAttributeValuesWithLabel,
  getClass,
  getEverything,
  getTranslate,
} from '../../../../helpers/d3/stringGetters'
import { displayDetails } from '../../../../helpers/d3/displayDetails'
import { getExtentInDomains } from '../../../../helpers/d3/extent'
import { getCategoryColor } from '../../../../helpers/d3/attributeGetters'
import { isInRanges } from '../../../../helpers/basic/range'
import { onMouseOutTooltip, onMouseOverTooltip } from '../../../../helpers/d3/tooltip'

import { ViewType } from '../../../../constants/views/ViewType'
import { SVG } from '../../../../constants/svg'
import { MouseAction } from '../../../../constants/actions/MouseAction'
import { BrushAction } from '../../../../constants/actions/BrushAction'
import { MIN_SCATTER_PLOT_GLYPHS_ATTRIBUTE_COUNT } from '../../../../constants/views/scatterPlotGlyphs'
import { CONTAINER_SAVE_ID, SAVE_ID } from '../../../../constants/save/save'

import { SCATTER_PLOT_GLYPHS_TEXT } from '../../../../text/views-and-menus/scatterPlotGlyphs'

import {
  AXIS_CLASS,
  DUPLICATES_CLASS,
  getScatterPlotGlyphsStyle,
  SCATTER_PLOT_GLYPHS_CLASS,
  SELECTED_CLASS,
} from '../../../../components-style/content/views/scatter-plot-glyphs/scatterPlotGlyphsStyle'
import { getViewsNotDisplayStyle } from '../../../../components-style/content/views/getViewsNotDisplayStyle'
import { Extent, DataEachP, OnBrushEvent } from '../../../../types/d3-types'
import { TOOLTIP_CLASS } from '../../../../constants/views/tooltip'

const SCATTER_PLOT_GLYPHS = `SCATTER_PLOT_GLYPHS`
const AXIS_X = `axisX`
const AXIS_Y = `axisY`

export interface ScatterPlotGlyphsProps extends VisualizationView, Brushable, ScatterPlotGlyphsSettings {}

export const ScatterPlotGlyphs: VoidFunctionComponent<ScatterPlotGlyphsProps> = ({
  width,
  height,
  dataset,
  refreshViews,
  displayAttributes,
  xAttribute,
  yAttribute,
  categoryAttribute,
  registerCleanBrushing,
  setComponentBrushing,
  isBrushingActive,
  isDetailsVisible,
  isBrushingOnEndOfMove,
  colorCategory,
  glyphSize,
  margins,
  opacity,
  brushColor,
}) => {
  const margin = useMemo(() => new Margin(...margins), [margins])
  const component = useRef<SVGGElement>(null)
  const color = scaleOrdinal(colorCategory)

  const [innerWidth, innerHeight] = [width - margin.width - glyphSize, height - margin.height - glyphSize]

  // selected coloring
  selectAll(getClass(SCATTER_PLOT_GLYPHS_CLASS)).classed(SELECTED_CLASS, (d) => (d as SelectableDataType).selected)

  displayDetails(isDetailsVisible, TOOLTIP_CLASS)

  const createScatterPlotGlyphs = useCallback(() => {
    const node = component.current
    if (!node) return
    const svg = select(node)
    svg.selectAll(getEverything()).remove() // clear

    const extentInDomains = getExtentInDomains([...displayAttributes, xAttribute, yAttribute], dataset)

    const [xScale, yScale] = [
      scaleLinear([0, innerWidth]).domain(extentInDomains[xAttribute]),
      scaleLinear([innerHeight, 0]).domain(extentInDomains[yAttribute]),
    ]

    const lineRadialGenerator = lineRadial()
    const radialScales = displayAttributes.map((attribute) =>
      scaleRadial([0, glyphSize / 2]).domain(extentInDomains[attribute]),
    )

    const getGlyphPath: DataEachP<SelectableDataType, string | null> = (data) =>
      lineRadialGenerator(
        displayAttributes.map((key, idx) => [
          (2 * Math.PI * idx) / displayAttributes.length,
          radialScales[idx](Number(data[key])),
        ]),
      )

    const makeGlyphs = (className: string) =>
      svg
        .selectAll(SCATTER_PLOT_GLYPHS)
        .data(dataset)
        .enter()
        .each((data, idx, elements) => {
          select(elements[idx])
            .append(SVG.elements.g)
            .selectAll(SVG.elements.path)
            .data([data])
            .enter()
            .append(SVG.elements.path)
            .attr(SVG.attributes.class, className)
            .attr(SVG.attributes.d, getGlyphPath)
            .attr(
              SVG.attributes.transform,
              getTranslate([xScale(Number(data[xAttribute])), yScale(Number(data[yAttribute]))]),
            )
            .on(MouseAction.mouseOver, onMouseOverTooltip(getAttributeValuesWithLabel))
            .on(MouseAction.mouseOut, onMouseOutTooltip)
            .style(SVG.style.fill, getCategoryColor(categoryAttribute, color))
        })
    makeGlyphs(SCATTER_PLOT_GLYPHS_CLASS)

    const axisX = svg
      .selectAll(AXIS_X)
      .data(dataset)
      .enter()
      .append(SVG.elements.g)
      .attr(SVG.attributes.transform, getTranslate([0, innerHeight]))
      .attr(SVG.attributes.class, AXIS_CLASS)
    axisX.call(axisBottom(xScale))
    svg
      .selectAll(AXIS_Y)
      .data(dataset)
      .enter()
      .append(SVG.elements.g)
      .attr(SVG.attributes.class, AXIS_CLASS)
      .call(axisLeft(yScale))
    const setBrushingSelection = (selection: BrushSelection2d) => {
      if (selection) {
        dataset.forEach(
          (data) =>
            (data.selected = isInRanges(selection, xScale(Number(data[xAttribute])), yScale(Number(data[yAttribute])))),
        )
        refreshViews()
      }
    }

    const onBrush: Record<BrushAction, OnBrushEvent<SelectableDataType>> = {
      [BrushAction.start]: () => {
        setComponentBrushing(ViewType.ScatterPlotGlyphs)
      },
      [BrushAction.move]: ({ selection }) => {
        if (!isBrushingOnEndOfMove) {
          const brushSelection = selection as BrushSelection2d
          setBrushingSelection(brushSelection)
        }
      },
      [BrushAction.end]: ({ selection }) => {
        const brushSelection = selection as BrushSelection2d
        setBrushingSelection(brushSelection)
        if (!brushSelection) {
          setComponentBrushing(null)
        }
      },
    }
    const brushExtent: Extent = [
      [-glyphSize / 2, -glyphSize / 2],
      [innerWidth + glyphSize / 2, innerHeight + glyphSize / 2],
    ]

    const makeBrush = brush()
      .on(BrushAction.start, onBrush[BrushAction.start])
      .on(BrushAction.move, onBrush[BrushAction.move])
      .on(BrushAction.end, onBrush[BrushAction.end])
      .extent(brushExtent)

    svg.call(makeBrush)

    // make duplicates for brushing/tooltip
    makeGlyphs(DUPLICATES_CLASS)
    registerCleanBrushing(() => {
      brush().clear(svg)
    })
  }, [
    dataset,
    innerWidth,
    innerHeight,
    refreshViews,
    setComponentBrushing,
    xAttribute,
    yAttribute,
    displayAttributes,
    categoryAttribute,
    glyphSize,
    color,
    registerCleanBrushing,
    isBrushingOnEndOfMove,
  ])

  useEffect(
    () => createScatterPlotGlyphs(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      displayAttributes,
      categoryAttribute,
      innerWidth,
      innerHeight,
      glyphSize,
      isBrushingOnEndOfMove,
      colorCategory,
      xAttribute,
      yAttribute,
    ],
  )

  if (innerWidth < 0 || innerHeight < 0) return <Box />
  if (displayAttributes.length >= MIN_SCATTER_PLOT_GLYPHS_ATTRIBUTE_COUNT) {
    return (
      <Box
        sx={getScatterPlotGlyphsStyle(opacity, isBrushingActive, brushColor)}
        id={CONTAINER_SAVE_ID[ViewType.ScatterPlotGlyphs]}
      >
        <svg width={width} height={height} id={SAVE_ID[ViewType.ScatterPlotGlyphs]}>
          <g ref={component} transform={getTranslate([margin.left + glyphSize / 2, margin.top + glyphSize / 2])} />
        </svg>
      </Box>
    )
  }
  return <Box sx={getViewsNotDisplayStyle(width, height, margin)}>{SCATTER_PLOT_GLYPHS_TEXT.unavailable}</Box>
}

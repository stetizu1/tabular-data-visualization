import { useCallback, useEffect, useMemo, useRef, useState, VoidFunctionComponent } from 'react'
import { scaleOrdinal, select } from 'd3'
import { Box } from '@mui/material'
import { sankey, sankeyLinkHorizontal } from '../../../../../lib/d3-sankey'

import { VisualizationView } from '../../../../types/views/VisualizationView'
import { Brushable } from '../../../../types/brushing/Brushable'
import { ParallelSetsBundledSettings } from '../../../../types/views/settings/ParallelSetsBundledSettings'
import { DataLink, NominalValueProperties } from '../../../../types/data/data'
import { Margin } from '../../../../types/styling/Margin'
import { NodeData, NodeDataPoint } from '../../../../types/d3-sankey'
import { DataEach, Extent, OnMouseEvent } from '../../../../types/d3-types'

import { getTogglingYShift, TOGGLE_Y_SHIFT } from '../../../../helpers/views/togglingYShift'
import {
  getAttributeFormatted,
  getEverything,
  getLinkDataPointValuesWithLabel,
  getNodeDataPointValuesWithLabel,
  getSpaced,
  getTranslate,
} from '../../../../helpers/stringGetters'
import { getGraph, getNeighborAttributes, getNominalValuesRecord } from '../../../../helpers/data/data'
import { onMouseOutTooltip, onMouseOverTooltip } from '../../../../helpers/d3/tooltip'
import { getStrokeWidth, getYShift } from '../../../../helpers/data/lineShifts'

import { ViewType } from '../../../../constants/views-general/ViewType'
import { CONTAINER_EMPTY, CONTAINER_SAVE_ID, SAVE_ID } from '../../../../constants/save/save'
import { MIN_PARALLEL_SETS_BUNDLED_ATTRIBUTE_COUNT } from '../../../../constants/views/parallelSetsBundled'
import { SVG } from '../../../../constants/svg'
import { AXES_TEXT_CLASS } from '../../../../components-style/content/views/parallel-coordinates/parallelCoordinatesStyle'
import { MouseAction } from '../../../../constants/actions/MouseAction'
import { ParallelSetsBrushingType } from '../../../../constants/brushing-type/ParallelSetsBrushingType'

import { PARALLEL_SETS_BUNDLED_TEXT } from '../../../../text/views-and-settings/parallelSetsBundled'

import { PLOT_FONT_BOX_SIZE } from '../../../../styles/font'

import { getViewsNotDisplayStyle } from '../../../../components-style/content/views/getViewsNotDisplayStyle'
import {
  CONNECTORS_CLASS,
  getParallelSetsBundledStyle,
  INNER_TEXT_CLASS,
  LINE_NOT_SELECTED_CLASS,
  SELECTED_CLASS,
  TABS_CLASS,
  TABS_SELECTED_CLASS,
} from '../../../../components-style/content/views/parallel-sets-bundled/parallelSetsBundledStyle'

export interface ParallelSetsBundledProps extends VisualizationView, Brushable, ParallelSetsBundledSettings {}

export const CONNECTORS = `CONNECTORS`
export const TEXT = `TEXT`
export const AXES_TEXT = `AXES_TEXT`
export const TABS = `TABS`

export const TEXT_SHIFT = 2

export const ParallelSetsBundled: VoidFunctionComponent<ParallelSetsBundledProps> = ({
  width,
  height,
  dataset,
  displayAttributes,
  isBrushingActive,
  colorCategory,
  margins,
  opacity,
  brushColor,
  redrawTime,
  setComponentBrushing,
  refreshViews,
  tabWidth,
  tabSpacing,
  tabGap,
  brushingType,
  fontColor,
  categoryAttribute,
}) => {
  const margin = useMemo(() => new Margin(...margins), [margins])
  const component = useRef<SVGGElement>(null)
  const upperPadding = TOGGLE_Y_SHIFT + PLOT_FONT_BOX_SIZE
  const [innerWidth, innerHeight] = [width - margin.width, height - margin.height - upperPadding]

  const [nominalValuesRecord, setNominalValuesRecord] = useState(getNominalValuesRecord(dataset))
  // redraw time needed because it is changing selected
  useEffect(() => {
    setNominalValuesRecord(getNominalValuesRecord(dataset))
  }, [dataset, redrawTime, displayAttributes])

  const createParallelSetsBundled = useCallback(() => {
    const node = component.current
    if (!node) return
    const svg = select(node)
    svg.selectAll(getEverything()).remove() // clear

    const displayPairs = getNeighborAttributes(displayAttributes)
    const pairWidth = (innerWidth - (displayAttributes.length - 2) * tabSpacing) / (displayAttributes.length - 1)
    const valueCounts = displayAttributes.map((att) => nominalValuesRecord[att]).map((arr) => arr.length)
    const spacesAllMax = Math.max(...valueCounts) - 1
    const isLeft = (d: NodeData): boolean => Number(d.x0) < pairWidth / 2

    const half = (displayAttributes.length - 1) / 2

    // brushing
    const onMouseClick: OnMouseEvent<NodeDataPoint> = (_, { attribute, name, count, countSelected }) => {
      dataset.forEach((data) => {
        if (String(data[attribute]) === name) {
          data.selected = count !== countSelected
        }
      })

      if (dataset.every((data) => !data.selected)) {
        setComponentBrushing(null)
        return
      }
      setComponentBrushing(ViewType.ParallelSetsBundled)
      refreshViews()
    }

    displayPairs.forEach((displayPair, pairIdx) => {
      const spacesPairMax = Math.max(valueCounts[pairIdx], valueCounts[pairIdx + 1]) - 1
      const pairExtent: Extent = [
        [0, 0],
        [pairWidth, innerHeight - (spacesAllMax - spacesPairMax) * tabGap],
      ]

      const color = scaleOrdinal(colorCategory)
      const sankeyLayout = sankey<NominalValueProperties, DataLink>()
        .nodeWidth(tabWidth)
        .nodePadding(tabGap)
        .nodeSort((a, b) => a.order - b.order)
        .extent(pairExtent)

      const graph = getGraph(dataset, categoryAttribute, nominalValuesRecord, displayPair[0], displayPair[1])
      const { nodes, links } = sankeyLayout(graph)
      const getPath = sankeyLinkHorizontal()

      const xShift = pairIdx * (pairWidth + tabSpacing)
      svg
        .append(SVG.elements.g)
        .selectAll(TABS)
        .data(nodes)
        .enter()
        .append(SVG.elements.rect)
        .attr(SVG.attributes.class, (node) =>
          node.count === node.countSelected ? getSpaced(TABS_CLASS, TABS_SELECTED_CLASS) : TABS_CLASS,
        )
        .attr(SVG.attributes.x, (node) => Number(node.x0) + xShift)
        .attr(SVG.attributes.y, (node) => Number(node.y0))
        .attr(SVG.attributes.height, (node) => Number(node.y1) - Number(node.y0))
        .attr(SVG.attributes.width, (node) => Number(node.x1) - Number(node.x0))
        .on(MouseAction.mouseOver, onMouseOverTooltip(getNodeDataPointValuesWithLabel))
        .on(MouseAction.mouseOut, onMouseOutTooltip)
        .on(MouseAction.click, onMouseClick)

      // connectors
      const connectors = svg
        .append(SVG.elements.g)
        .attr(SVG.attributes.class, CONNECTORS_CLASS)
        .attr(SVG.attributes.transform, getTranslate([pairIdx * (pairWidth + tabSpacing), 0]))
        .selectAll(CONNECTORS)
        .data(links)
        .enter()

      const colorCategories = categoryAttribute ? nominalValuesRecord[categoryAttribute].map((att) => att.name) : [`1`] // one category
      const isOverlay = brushingType === ParallelSetsBrushingType.overlay
      // for each value runs once
      colorCategories.forEach((category, idx) => {
        // base
        connectors
          .append(SVG.elements.path)
          .attr(SVG.attributes.class, LINE_NOT_SELECTED_CLASS)
          .attr(SVG.attributes.d, getPath)
          .attr(SVG.attributes.stroke, color(category))
          .attr(SVG.attributes.strokeWidth, (link) => getStrokeWidth(link, idx, false, isOverlay))
          .attr(SVG.attributes.transform, (link) => getTranslate([0, getYShift(link, idx, false, isOverlay)]))
          .on(MouseAction.mouseOver, onMouseOverTooltip(getLinkDataPointValuesWithLabel))
          .on(MouseAction.mouseOut, onMouseOutTooltip)

        // brushing
        connectors
          .append(SVG.elements.path)
          .attr(SVG.attributes.class, SELECTED_CLASS)
          .attr(SVG.attributes.d, getPath)
          .attr(SVG.attributes.strokeWidth, (link) => getStrokeWidth(link, idx, true))
          .attr(SVG.attributes.transform, (link) => getTranslate([0, getYShift(link, idx, true, isOverlay)]))
          .on(MouseAction.mouseOver, onMouseOverTooltip(getLinkDataPointValuesWithLabel))
          .on(MouseAction.mouseOut, onMouseOutTooltip)
      })

      const getTextVisible: DataEach<NodeData, SVGTextElement, number> = (node) => {
        if (pairIdx === Math.floor(half)) return 1
        if ((isLeft(node) && pairIdx > half) || (!isLeft(node) && pairIdx < half)) return 0
        return 1
      }

      // line text
      svg
        .append(SVG.elements.g)
        .selectAll(TEXT)
        .data(nodes)
        .enter()
        .append(SVG.elements.text)
        .attr(SVG.attributes.class, INNER_TEXT_CLASS)
        .attr(
          SVG.attributes.x,
          (node) => (isLeft(node) ? Number(node.x1) + TEXT_SHIFT : Number(node.x0) - TEXT_SHIFT) + xShift,
        )
        .attr(SVG.attributes.y, (node) => (Number(node.y1) + Number(node.y0)) / 2)
        .attr(SVG.attributes.textAnchor, (node) => (isLeft(node) ? SVG.values.start : SVG.values.end))
        .style(SVG.style.opacity, getTextVisible)
        .text((node) => getAttributeFormatted(node.name))
    })
    // axis text
    svg
      .append(SVG.elements.g)
      .selectAll(AXES_TEXT)
      .data(displayAttributes)
      .enter()
      .append(SVG.elements.text)
      .attr(SVG.attributes.textAnchor, SVG.values.middle)
      .attr(SVG.attributes.x, (_, idx) => idx * (pairWidth + tabSpacing))
      .attr(SVG.attributes.y, getTogglingYShift)
      .text(getAttributeFormatted)
      .attr(SVG.attributes.class, AXES_TEXT_CLASS)
  }, [
    displayAttributes,
    innerWidth,
    tabWidth,
    nominalValuesRecord,
    dataset,
    setComponentBrushing,
    refreshViews,
    innerHeight,
    tabGap,
    colorCategory,
    tabSpacing,
    categoryAttribute,
    brushingType,
  ])

  useEffect(
    () => createParallelSetsBundled(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      displayAttributes,
      innerWidth,
      innerHeight,
      colorCategory,
      nominalValuesRecord,
      tabWidth,
      tabSpacing,
      tabGap,
      categoryAttribute,
      brushingType,
    ],
  )

  if (innerWidth < 0 || innerHeight < 0) return <Box />
  if (displayAttributes.length >= MIN_PARALLEL_SETS_BUNDLED_ATTRIBUTE_COUNT) {
    return (
      <Box
        sx={getParallelSetsBundledStyle(opacity, isBrushingActive, brushColor, fontColor)}
        id={CONTAINER_SAVE_ID[ViewType.ParallelSetsBundled]}
      >
        <svg width={width} height={height} id={SAVE_ID[ViewType.ParallelSetsBundled]}>
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
    <Box sx={getViewsNotDisplayStyle(width, height, margin)} id={CONTAINER_EMPTY[ViewType.ParallelSetsBundled]}>
      {PARALLEL_SETS_BUNDLED_TEXT.unavailable}
    </Box>
  )
}

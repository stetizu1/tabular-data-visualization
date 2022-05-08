import { useCallback, useEffect, useMemo, useRef, useState, VoidFunctionComponent } from 'react'
import { scaleOrdinal, select } from 'd3'
import { Box } from '@mui/material'
import { sankey, sankeyLinkHorizontal } from '../../../../../lib/d3-sankey'

import { VisualizationView } from '../../../../types/views/VisualizationView'
import { Brushable } from '../../../../types/brushing/Brushable'
import { ParallelSetsBundledSettings } from '../../../../types/views/settings/ParallelSetsBundledSettings'
import { NominalValueProperties } from '../../../../types/data/data'
import { Margin } from '../../../../types/styling/Margin'

import { getTextTogglingYShift, TOGGLE_TEXT_Y_SHIFT } from '../../../../helpers/d3/attributeGetters'
import {
  getAttributeFormatted,
  getEverything,
  getParallelSetsLabel,
  getTranslate,
} from '../../../../helpers/d3/stringGetters'
import { getGraph, getNeighborAttributes, getNominalValuesRecord } from '../../../../helpers/data/data'

import { ViewType } from '../../../../constants/views/ViewTypes'
import { CONTAINER_SAVE_ID, SAVE_ID } from '../../../../constants/save/save'
import { MIN_PARALLEL_SETS_BUNDLED_ATTRIBUTE_COUNT } from '../../../../constants/views/parallelSetsBundled'

import { PARALLEL_SETS_BUNDLED_TEXT } from '../../../../text/views-and-menus/parallelSetsBundled'

import { PLOT_FONT_BOX_SIZE } from '../../../../styles/font'

import { getViewsNotDisplayStyle } from '../../../../components-style/content/views/getViewsNotDisplayStyle'
import { getParallelSetsBundledStyle } from '../../../../components-style/content/views/parallel-sets-bundled/parallelSetsBundledStyle'
import { NodeData, NodeDataPoint, SankeyDataLink } from '../../../../types/d3-sankey'
import { DataEach, Extent, OnMouseEvent } from '../../../../types/d3-types'
import { SVG } from '../../../../constants/svg'
import { AXES_TEXT_CLASS } from '../../../../components-style/content/views/parallel-coordinates/parallelCoordinatesStyle'
import { MouseAction } from '../../../../constants/actions/MouseAction'
import { ColoringFrom } from '../../../../constants/data/ColoringFrom'

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
  coloringFrom,
}) => {
  const margin = useMemo(() => new Margin(...margins), [margins])
  const component = useRef<SVGGElement>(null)
  const upperPadding = TOGGLE_TEXT_Y_SHIFT + PLOT_FONT_BOX_SIZE
  const [innerWidth, innerHeight] = [width - margin.width, height - margin.height - upperPadding]

  const [nominalValuesRecord, setNominalValuesRecord] = useState(getNominalValuesRecord(dataset))
  // redraw time needed because it is changing selected
  useEffect(() => {
    setNominalValuesRecord(getNominalValuesRecord(dataset))
  }, [dataset, redrawTime, displayAttributes])

  // selected coloring todo
  // selectAll(getClass(PARALLEL_SETS_BUNDLED_CLASS)).classed(SELECTED_CLASS, (d) => (d as SelectableDataType).selected)

  const createParallelSetsBundled = useCallback(() => {
    const node = component.current
    if (!node) return
    const svg = select(node)
    svg.selectAll(getEverything()).remove() // clear

    const displayPairs = getNeighborAttributes(displayAttributes)
    const sankeyWidth = (innerWidth - (displayAttributes.length - 2) * tabSpacing) / (displayAttributes.length - 1)
    const valueCounts = displayAttributes.map((att) => nominalValuesRecord[att]).map((arr) => arr.length)
    const spacesAllMax = Math.max(...valueCounts) - 1

    const half = (displayAttributes.length - 1) / 2
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
      const sankeyExtent: Extent = [
        [0, 0],
        [sankeyWidth, innerHeight - (spacesAllMax - spacesPairMax) * tabGap],
      ]

      const color = scaleOrdinal(colorCategory)
      const sankeyLayout = sankey<NominalValueProperties, SankeyDataLink>()
        .nodeWidth(tabWidth)
        .nodePadding(tabGap)
        .nodeSort((a, b) => Number(a.name) - Number(b.name))
        .extent(sankeyExtent)

      const graph = getGraph(dataset, nominalValuesRecord, displayPair[0], displayPair[1])
      const { nodes, links } = sankeyLayout(graph)

      const xShift = pairIdx * (sankeyWidth + tabSpacing)
      svg
        .append(SVG.elements.g)
        .selectAll(TABS)
        .data(nodes)
        .enter()
        .append(SVG.elements.rect)
        .attr(SVG.attributes.x, (d) => Number(d.x0) + xShift)
        .attr(SVG.attributes.y, (d) => Number(d.y0))
        .attr(SVG.attributes.height, (d) => Number(d.y1) - Number(d.y0))
        .attr(SVG.attributes.width, (d) => Number(d.x1) - Number(d.x0))
        .on(MouseAction.click, onMouseClick)

      // connectors
      const connectors = svg
        .append(SVG.elements.g)
        .style(SVG.style.fill, SVG.values.none)
        .attr(SVG.attributes.transform, getTranslate([pairIdx * (sankeyWidth + tabSpacing), 0]))
        .selectAll(CONNECTORS)
        .data(links)
        .enter()

      connectors
        .append(SVG.elements.path)
        .attr(SVG.attributes.d, sankeyLinkHorizontal())
        .attr(SVG.attributes.stroke, (d) => color(d.names[coloringFrom === ColoringFrom.left ? 0 : 1]))
        .attr(SVG.attributes.strokeWidth, (d) => Number(d.width))
        .style(SVG.style.mixBlendMode, SVG.values.multiply)

      connectors
        .append(SVG.elements.path)
        .attr(SVG.attributes.d, sankeyLinkHorizontal())
        .attr(SVG.attributes.stroke, (d) => `red`)
        .attr(SVG.attributes.transform, (d) => {
          const yShift = d.width ? -(Number(d.width) - Number(d.width) * (d.selected / d.value)) / 2 : 0
          return getTranslate([0, yShift])
        })
        .attr(SVG.attributes.strokeWidth, (d) => Number(d.width) * (d.selected / d.value))

      const getXShift: DataEach<NodeData, SVGTextElement, number> = (d) => {
        const isLeft = Number(d.x0) < sankeyWidth / 2
        return (isLeft ? Number(d.x1) + TEXT_SHIFT : Number(d.x0) - TEXT_SHIFT) + xShift
      }
      const getYShift: DataEach<NodeData, SVGTextElement, number> = (d) => (Number(d.y1) + Number(d.y0)) / 2
      const getTextAnchor: DataEach<NodeData, SVGTextElement, string> = (d) => {
        const isLeft = Number(d.x0) < sankeyWidth / 2
        return isLeft ? SVG.values.start : SVG.values.end
      }
      const getTextVisible: DataEach<NodeData, SVGTextElement, number> = (d) => {
        if (pairIdx === Math.floor(half)) return 1
        const isLeft = Number(d.x0) < sankeyWidth / 2
        if ((isLeft && pairIdx > half) || (!isLeft && pairIdx < half)) return 0
        return 1
      }

      // line text
      svg
        .append(SVG.elements.g)
        .selectAll(TEXT)
        .data(nodes)
        .enter()
        .append(SVG.elements.text)
        .attr(SVG.attributes.x, getXShift)
        .attr(SVG.attributes.y, getYShift)
        .attr(SVG.attributes.textAnchor, getTextAnchor)
        .style(SVG.style.opacity, getTextVisible)
        .text(getParallelSetsLabel)
    })
    // axis text
    svg
      .append(SVG.elements.g)
      .selectAll(AXES_TEXT)
      .data(displayAttributes)
      .enter()
      .append(SVG.elements.text)
      .attr(SVG.attributes.textAnchor, SVG.values.middle)
      .attr(SVG.attributes.x, (_, idx) => idx * (sankeyWidth + tabSpacing))
      .attr(SVG.attributes.y, getTextTogglingYShift)
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
    coloringFrom,
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
      coloringFrom,
    ],
  )

  if (innerWidth < 0 || innerHeight < 0) return <Box />
  if (displayAttributes.length >= MIN_PARALLEL_SETS_BUNDLED_ATTRIBUTE_COUNT) {
    return (
      <Box
        sx={getParallelSetsBundledStyle(opacity, isBrushingActive, brushColor)}
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
  return <Box sx={getViewsNotDisplayStyle(width, height, margin)}>{PARALLEL_SETS_BUNDLED_TEXT.unavailable}</Box>
}

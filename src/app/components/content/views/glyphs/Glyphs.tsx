import { VoidFunctionComponent, useCallback, useEffect, useMemo, useRef } from 'react'
import { lineRadial, scaleLinear, scaleOrdinal, scaleRadial, select, selectAll } from 'd3'
import { Box } from '@mui/material'

import { SelectableDataType } from '../../../../types/data/data'
import { Brushable } from '../../../../types/brushing/Brushable'
import { VisualizationView } from '../../../../types/views/VisualizationView'
import { GlyphsSettings } from '../../../../types/views/settings/GlyphsSettings'
import { Margin } from '../../../../types/styling/Margin'

import { getExtendedExtentInDomains } from '../../../../helpers/d3/extent'
import { getCategoryColor } from '../../../../helpers/d3/attributeGetters'
import { getClass, getEverything, getTranslate } from '../../../../helpers/d3/stringGetters'
import { getComparator } from '../../../../helpers/data/comparator'
import { onMouseOutTooltip, onMouseOverTooltip } from '../../../../helpers/d3/tooltip'

import { SVG } from '../../../../constants/svg'
import { MIN_GLYPHS_ATTRIBUTE_COUNT } from '../../../../constants/views/glyphs'
import { MouseAction } from '../../../../constants/actions/MouseAction'
import { ViewType } from '../../../../constants/views/ViewTypes'
import { CONTAINER_SAVE_ID, SAVE_ID } from '../../../../constants/save/save'

import { GLYPHS_TEXT } from '../../../../text/views-and-menus/glyphs'

import {
  getGlyphsStyle,
  GLYPHS_CLASS,
  SELECTED_CLASS,
} from '../../../../components-style/content/views/glyphs/glyphsStyle'
import { getViewsNotDisplayStyle } from '../../../../components-style/content/views/getViewsNotDisplayStyle'
import { DataEachP, OnMouseEvent } from '../../../../types/d3-types'

export interface GlyphsProps extends VisualizationView, Brushable, GlyphsSettings {}

const GLYPHS = `GLYPHS`

export const Glyphs: VoidFunctionComponent<GlyphsProps> = ({
  dataset,
  width,
  height,
  displayAttributes,
  categoryAttribute,
  isBrushingActive,
  setComponentBrushing,
  refreshViews,
  sortAttribute,
  sortType,
  colorCategory,
  glyphSize,
  glyphSpacing,
  margins,
  opacity,
  brushColor,
}) => {
  const margin = useMemo(() => new Margin(...margins), [margins])
  const component = useRef<SVGGElement>(null)

  const sortableDataset = useMemo<SelectableDataType[]>(() => [...dataset], [dataset])
  const sortedDataset = useMemo(
    () => sortableDataset.sort(getComparator(sortType, sortAttribute)),
    [sortableDataset, sortAttribute, sortType],
  )

  const color = scaleOrdinal(colorCategory)

  const innerWidth = width - margin.width
  const glyphSizeWithSpacing = glyphSize + glyphSpacing
  const glyphsCountPerLine = Math.floor(innerWidth / glyphSizeWithSpacing)
  const glyphsCountPerHeight = Math.ceil(dataset.length / glyphsCountPerLine)
  const innerHeight = glyphsCountPerHeight * glyphSizeWithSpacing
  const glyphRadius = glyphSize / 2

  // selected coloring
  selectAll(getClass(GLYPHS_CLASS)).classed(SELECTED_CLASS, (d) => (d as SelectableDataType).selected)

  const createGlyphs = useCallback(() => {
    const node = component.current!
    const svg = select(node)
    svg.selectAll(getEverything()).remove() // clear

    const [xScale, yScale] = [
      scaleLinear([0, innerWidth]).domain([0, glyphsCountPerLine]),
      scaleLinear([innerHeight, 0]).domain([0, glyphsCountPerHeight]),
    ]

    const extentInDomains = getExtendedExtentInDomains(displayAttributes, dataset, 5)

    const lineRadialGenerator = lineRadial()
    const radialScales = displayAttributes.map((attribute) =>
      scaleRadial([0, glyphRadius]).domain(extentInDomains[attribute]),
    )

    // functions setting attributes
    const getTransform: DataEachP<SelectableDataType, string> = (data) => {
      const idx = sortedDataset.indexOf(data)
      return getTranslate([
        xScale(idx % glyphsCountPerLine) + glyphRadius,
        yScale(glyphsCountPerHeight - Math.floor(idx / glyphsCountPerLine)) + glyphRadius,
      ])
    }
    const getGlyphPath: DataEachP<SelectableDataType, string | null> = (data) =>
      lineRadialGenerator(
        displayAttributes.map((key, idx) => [
          (2 * Math.PI * idx) / displayAttributes.length,
          radialScales[idx](Number(data[key])),
        ]),
      )

    const onMouseClick: OnMouseEvent<SelectableDataType> = (_, changedData) => {
      changedData.selected = !changedData.selected
      if (dataset.every((data) => !data.selected)) {
        setComponentBrushing(null)
        return
      }
      setComponentBrushing(ViewType.Glyphs)
      refreshViews()
    }

    svg
      .selectAll(GLYPHS)
      .data(dataset)
      .enter()
      .each((data, idx, elements) => {
        select(elements[idx])
          .append(SVG.elements.g)
          .selectAll(SVG.elements.path)
          .data([data])
          .enter()
          .append(SVG.elements.path)
          .attr(SVG.attributes.class, GLYPHS_CLASS)
          .attr(SVG.attributes.d, getGlyphPath)
          .attr(SVG.attributes.transform, getTransform)
          .on(MouseAction.mouseOver, onMouseOverTooltip)
          .on(MouseAction.mouseOut, onMouseOutTooltip)
          .on(MouseAction.click, onMouseClick)
          .style(SVG.style.fill, getCategoryColor(categoryAttribute, color))
      })
    // selected coloring, needed again
    selectAll(getClass(GLYPHS_CLASS)).classed(SELECTED_CLASS, (d) => (d as SelectableDataType).selected)
  }, [
    dataset,
    sortedDataset,
    innerWidth,
    innerHeight,
    refreshViews,
    setComponentBrushing,
    glyphsCountPerLine,
    glyphsCountPerHeight,
    glyphRadius,
    displayAttributes,
    categoryAttribute,
    color,
  ])

  useEffect(
    () => createGlyphs(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [displayAttributes, categoryAttribute, sortAttribute, sortType, innerWidth, innerHeight, colorCategory],
  )

  if (displayAttributes.length >= MIN_GLYPHS_ATTRIBUTE_COUNT) {
    return (
      <Box sx={getGlyphsStyle(opacity, isBrushingActive, brushColor)} id={CONTAINER_SAVE_ID[ViewType.Glyphs]}>
        <svg width={width} height={innerHeight + margin.height} id={SAVE_ID[ViewType.Glyphs]}>
          <g ref={component} transform={getTranslate([margin.left, margin.top])} />
        </svg>
      </Box>
    )
  }
  return <Box sx={getViewsNotDisplayStyle(width, height, margin)}>{GLYPHS_TEXT.unavailable}</Box>
}

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
import {
  getAttributeValuesWithLabel,
  getClass,
  getEverything,
  getTranslate,
  px,
} from '../../../../helpers/d3/stringGetters'

import { SVG } from '../../../../constants/svg'
import { MIN_GLYPHS_ATTRIBUTE_COUNT } from '../../../../constants/views/glyphs'
import { TOOLTIP, TOOLTIP_CLASS } from '../../../../constants/views/tooltip'
import { MouseActions } from '../../../../constants/actions/MouseActions'
import { HTML } from '../../../../constants/html'
import { CONTAINER_SAVE_ID, SAVE_ID } from '../../../../constants/save/save'
import { ViewType } from '../../../../constants/views/ViewTypes'

import { GLYPHS_TEXT } from '../../../../text/views-and-menus/glyphs'

import {
  getGlyphsStyle,
  GLYPHS_CLASS,
  SELECTED_CLASS,
} from '../../../../components-style/content/views/glyphs/glyphsStyle'
import { getViewsNotDisplayStyle } from '../../../../components-style/content/views/getViewsNotDisplayStyle'

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
  setDataSelected,
  sortAttribute,
  colorCategory,
  glyphSize,
  glyphSpacing,
  margins,
  opacity,
}) => {
  const margin = useMemo(() => new Margin(...margins), [margins])
  const component = useRef<SVGGElement>(null)
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

    const sortedDataset = sortAttribute
      ? [...dataset].sort((a, b) => Number(a[sortAttribute]) - Number(b[sortAttribute]))
      : [...dataset]

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
    const getTransform = (data: SelectableDataType) => {
      const idx = sortedDataset.indexOf(data)
      return getTranslate([
        xScale(idx % glyphsCountPerLine) + glyphRadius,
        yScale(glyphsCountPerHeight - Math.floor(idx / glyphsCountPerLine)) + glyphRadius,
      ])
    }
    const getGlyphPath = (data: SelectableDataType) =>
      lineRadialGenerator(
        displayAttributes.map((key, idx) => [
          (2 * Math.PI * idx) / displayAttributes.length,
          radialScales[idx](Number(data[key])),
        ]),
      )

    const tooltip = select(getClass(TOOLTIP_CLASS))
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
          .on(MouseActions.mouseOver, ({ clientX, clientY }: MouseEvent, data: SelectableDataType) => {
            tooltip.transition().duration(TOOLTIP.easeIn).style(SVG.style.opacity, TOOLTIP.visible)
            tooltip
              .html(getAttributeValuesWithLabel(data).join(HTML.newLine))
              .style(SVG.style.left, px(clientX))
              .style(SVG.style.top, px(clientY))
          })
          .on(MouseActions.mouseOut, () => {
            tooltip.transition().duration(TOOLTIP.easeOut).style(SVG.style.opacity, TOOLTIP.invisible)
          })
          .on(MouseActions.click, (_: MouseEvent, changedData: SelectableDataType) => {
            const selected = dataset.map((data) => (data === changedData ? !data.selected : data.selected))
            if (selected.every((value) => !value)) {
              setComponentBrushing(null)
              return
            }
            setComponentBrushing(ViewType.Glyphs)
            setDataSelected((data, idx) => selected[idx])
          })
          .style(SVG.style.fill, getCategoryColor(categoryAttribute, color))
      })
  }, [
    dataset,
    innerWidth,
    innerHeight,
    setDataSelected,
    setComponentBrushing,
    glyphsCountPerLine,
    glyphsCountPerHeight,
    glyphRadius,
    displayAttributes,
    categoryAttribute,
    sortAttribute,
    color,
  ])

  useEffect(
    () => createGlyphs(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [displayAttributes, categoryAttribute, sortAttribute, innerWidth, innerHeight, colorCategory],
  )

  if (displayAttributes.length >= MIN_GLYPHS_ATTRIBUTE_COUNT) {
    return (
      <Box sx={getGlyphsStyle(opacity, isBrushingActive)} id={CONTAINER_SAVE_ID[ViewType.Glyphs]}>
        <svg width={width} height={innerHeight + margin.height} id={SAVE_ID[ViewType.Glyphs]}>
          <g ref={component} transform={getTranslate([margin.left, margin.top])} />
        </svg>
      </Box>
    )
  }
  return <Box sx={getViewsNotDisplayStyle(width, height, margin)}>{GLYPHS_TEXT.unavailable}</Box>
}

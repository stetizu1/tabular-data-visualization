import { FunctionComponent, useCallback, useEffect, useMemo, useRef } from 'react'
import { lineRadial, scaleLinear, scaleOrdinal, scaleRadial, select, selectAll } from 'd3'
import clsx from 'clsx'

import { SelectableDataType } from '../../../../types/data/data'
import { Highlightable } from '../../../../types/brushing/Brushable'
import { VisualizationView } from '../../../../types/views/VisualizationView'
import { GlyphsSettings } from '../../../../types/views/glyphs/GlyphsSettings'
import { Margin } from '../../../../types/styling/Margin'

import { getExtendedExtentInDomains } from '../../../../helpers/d3/extent'
import { getCategoryColor } from '../../../../helpers/d3/attributeGetters'
import { displayDetails } from '../../../../helpers/d3/displayDetails'
import {
  getAttributeValuesWithLabel,
  getClass,
  getEverything,
  getTranslate,
  px,
} from '../../../../helpers/d3/stringGetters'

import { SVG } from '../../../../constants/svg'
import { MIN_GLYPHS_ATTRIBUTE_COUNT } from '../../../../constants/views/glyphs'
import { TOOLTIP } from '../../../../constants/views/tooltip'
import { MouseActions } from '../../../../constants/actions/MouseActions'
import { HTML } from '../../../../constants/html'
import { SAVE_ID } from '../../../../constants/save/save'
import { ViewType } from '../../../../constants/views/ViewTypes'

import { GLYPHS_TEXT } from '../../../../text/views-and-menus/glyphs'

import { useGlyphsStyle } from '../../../../components-style/content/views/glyphs/useGlyphsStyle'
import { useTooltipStyle } from '../../../../components-style/content/views/useTooltipStyle'

export interface GlyphsProps extends VisualizationView, Highlightable, GlyphsSettings {}

const GLYPHS = `glyphs`

export const Glyphs: FunctionComponent<GlyphsProps> = ({
  dataset,
  width,
  height,
  displayAttributes,
  categoryAttribute,
  isBrushingActive,
  sortAttribute,
  colorCategory,
  glyphSize,
  glyphSpacing,
  margins,
  isDetailsVisible,
  opacity,
}) => {
  const margin = useMemo(() => new Margin(...margins), [margins])
  const classes = useGlyphsStyle({ width, height, margin, opacity })
  const { tooltip: tooltipClass } = useTooltipStyle()
  const component = useRef<SVGGElement>(null)
  const color = scaleOrdinal(colorCategory)

  const innerWidth = width - margin.width
  const glyphSizeWithSpacing = glyphSize + glyphSpacing
  const glyphsCountPerLine = Math.floor(innerWidth / glyphSizeWithSpacing)
  const glyphsCountPerHeight = Math.ceil(dataset.length / glyphsCountPerLine)
  const innerHeight = glyphsCountPerHeight * glyphSizeWithSpacing
  const glyphRadius = glyphSize / 2

  // selected coloring
  selectAll(getClass(GLYPHS))
    .classed(classes.selected, (d) => (d as SelectableDataType).selected)
    .classed(classes.hidden, (d) => isBrushingActive && !(d as SelectableDataType).selected)

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

    const tooltip = select(getClass(tooltipClass))
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
          .attr(SVG.attributes.class, clsx(classes.glyph, GLYPHS))
          .attr(SVG.attributes.d, getGlyphPath)
          .attr(SVG.attributes.transform, getTransform)
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
      })
  }, [
    dataset,
    classes,
    tooltipClass,
    innerWidth,
    innerHeight,
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
  displayDetails(isDetailsVisible, tooltipClass)

  if (displayAttributes.length >= MIN_GLYPHS_ATTRIBUTE_COUNT) {
    return (
      <>
        <svg width={width} height={innerHeight + margin.height} className={classes.svg} id={SAVE_ID[ViewType.Glyphs]}>
          <g ref={component} transform={getTranslate([margin.left, margin.top])} />
        </svg>
        <div className={tooltipClass} />
      </>
    )
  }
  return <div className={classes.notDisplayed}>{GLYPHS_TEXT.unavailable2}</div>
}

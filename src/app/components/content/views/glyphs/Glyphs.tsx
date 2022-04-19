import { FunctionComponent, useCallback, useEffect, useRef } from 'react'
import { lineRadial, scaleLinear, scaleOrdinal, scaleRadial, schemeCategory10, select, selectAll } from 'd3'

import { SelectableDataType } from '../../../../types/data/data'
import { Highlightable } from '../../../../types/brushing/Brushable'
import { Visualization } from '../../../../types/views/Visualization'
import { GlyphsSettings } from '../../../../types/views/glyphs/GlyphsSettings'

import { defaultMargin } from '../../../../constants/defaultMargin'
import { SVG } from '../../../../constants/svg'

import { getExtendedExtentInDomains } from '../../../../helpers/d3/extent'
import { GET_EVERYTHING, getClass, getTranslate } from '../../../../helpers/d3/stringSetters'

import { PLOT_COLORS } from '../../../../styles/colors'
import { useGlyphsStyle } from './useGlyphsStyle'

interface GlyphsProps extends Visualization, Highlightable, GlyphsSettings {
  glyphSize?: number
}

const GLYPH_SPACING = 3

export default GLYPH_SPACING
const GLYPHS = `glyphs`

export const Glyphs: FunctionComponent<GlyphsProps> = ({
  dataset,
  width,
  margin = defaultMargin,
  displayAttributes,
  categoryAttribute,
  isBrushingActive,
  sortAttribute,
  glyphSize = 40,
}) => {
  const classes = useGlyphsStyle()
  const component = useRef<SVGGElement>(null)

  const innerWidth = width - margin.width
  const glyphSizeWithSpacing = glyphSize + GLYPH_SPACING
  const glyphsCountPerLine = Math.floor(innerWidth / glyphSizeWithSpacing)
  const glyphsCountPerHeight = Math.ceil(dataset.length / glyphsCountPerLine)
  const innerHeight = glyphsCountPerHeight * glyphSizeWithSpacing
  const glyphRadius = glyphSize / 2

  // selected coloring
  selectAll(getClass(classes.glyph))
    .classed(classes.selected, (d) => (d as SelectableDataType).selected)
    .classed(classes.hidden, (d) => isBrushingActive && !(d as SelectableDataType).selected)

  const createGlyphs = useCallback(() => {
    const node = component.current!
    const svg = select(node)
    svg.selectAll(GET_EVERYTHING).remove() // clear

    const sorted = sortAttribute
      ? [...dataset].sort((a, b) => Number(a[sortAttribute]) - Number(b[sortAttribute]))
      : [...dataset]

    const [xScale, yScale] = [
      scaleLinear([0, innerWidth]).domain([0, glyphsCountPerLine]),
      scaleLinear([innerHeight, 0]).domain([0, glyphsCountPerHeight]),
    ]

    const extentInDomains = getExtendedExtentInDomains(displayAttributes, dataset, 5)

    const lineRadialGenerator = lineRadial()
    const radialScales = displayAttributes.map((attribute) =>
      scaleRadial([0, glyphRadius]).domain(extentInDomains[attribute]!),
    )
    const color = scaleOrdinal(schemeCategory10)

    // functions setting attributes
    const getCategoryColor = (data: SelectableDataType) =>
      categoryAttribute ? color(String(data[categoryAttribute])) : PLOT_COLORS.noCategoryColor
    const getTransform = (data: SelectableDataType) => {
      const idx = sorted.indexOf(data)
      const translate: [number, number] = [
        xScale(idx % glyphsCountPerLine) + glyphRadius + margin.left,
        yScale(glyphsCountPerHeight - Math.floor(idx / glyphsCountPerLine)) + glyphRadius + margin.top,
      ]
      return getTranslate(translate)
    }
    const getGlyphPath = (data: SelectableDataType) =>
      lineRadialGenerator(
        displayAttributes.map((key, idx) => [
          (2 * Math.PI * idx) / displayAttributes.length,
          radialScales[idx](Number(data[key])),
        ]),
      )

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
          .attr(SVG.attributes.class, classes.glyph)
          .attr(SVG.attributes.d, getGlyphPath)
          .attr(SVG.attributes.transform, getTransform)
          .style(SVG.attributes.fill, getCategoryColor)
      })
  }, [
    dataset,
    classes,
    innerWidth,
    innerHeight,
    margin,
    glyphsCountPerLine,
    glyphsCountPerHeight,
    glyphRadius,
    displayAttributes,
    categoryAttribute,
    sortAttribute,
  ])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => createGlyphs(), [displayAttributes, categoryAttribute, sortAttribute])

  return (
    <svg width={width} height={innerHeight + margin.height} className={classes.svg}>
      <g ref={component} />
    </svg>
  )
}

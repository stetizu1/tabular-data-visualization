import { FunctionComponent, useCallback, useEffect, useMemo, useRef } from 'react'
import { lineRadial, scaleLinear, scaleOrdinal, scaleRadial, select, selectAll } from 'd3'

import { SelectableDataType } from '../../../../types/data/data'
import { Highlightable } from '../../../../types/brushing/Brushable'
import { VisualizationView } from '../../../../types/views/VisualizationView'
import { GlyphsSettings } from '../../../../types/views/glyphs/GlyphsSettings'
import { Margin } from '../../../../types/styling/Margin'

import { getExtendedExtentInDomains } from '../../../../helpers/d3/extent'
import { getClass, getEverything, getTranslate } from '../../../../helpers/d3/stringGetters'
import { getCategoryColor } from '../../../../helpers/d3/attributeGetters'

import { SVG } from '../../../../constants/svg'
import { GLYPHS_DEFAULT_MARGIN, MIN_GLYPHS_ATTRIBUTE_COUNT } from '../../../../constants/views/glyphs'

import { GLYPHS_TEXT } from '../../../../text/views-and-menus/glyphs'

import { useGlyphsStyle } from '../../../../components-style/content/views/glyphs/useGlyphsStyle'

const GLYPH_SPACING = 3

export interface GlyphsProps extends VisualizationView, Highlightable, GlyphsSettings {
  glyphSize?: number
}

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
  glyphSize = 40,
  margins = GLYPHS_DEFAULT_MARGIN,
}) => {
  const margin = useMemo(() => new Margin(...margins), [margins])
  const classes = useGlyphsStyle({ width, height, margin })
  const component = useRef<SVGGElement>(null)
  const color = scaleOrdinal(colorCategory)

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
          .style(SVG.style.fill, getCategoryColor(categoryAttribute, color))
      })
  }, [
    dataset,
    classes,
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => createGlyphs(), [displayAttributes, categoryAttribute, sortAttribute])

  if (displayAttributes.length >= MIN_GLYPHS_ATTRIBUTE_COUNT) {
    return (
      <svg width={width} height={innerHeight + margin.height} className={classes.svg}>
        <g ref={component} transform={getTranslate([margin.left, margin.top])} />
      </svg>
    )
  }
  return <div className={classes.notDisplayed}>{GLYPHS_TEXT.unavailable2}</div>
}

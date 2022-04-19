import { FunctionComponent, useCallback, useEffect, useRef } from 'react'
import { lineRadial, scaleLinear, scaleOrdinal, scaleRadial, schemeCategory10, select, selectAll } from 'd3'

import { SelectableDataType } from '../../../../types/data/data'
import { Highlightable } from '../../../../types/brushing/Brushable'
import { defaultMargin } from '../../../../types/styling/Margin'
import { PLOT_COLORS } from '../../../../styles/colors'
import { useGlyphsStyle } from './useGlyphsStyle'
import { GlyphsSettings } from '../../../../types/views/glyphs/GlyphsSettings'
import { Visualization } from '../../../../types/views/Visualization'
import { getExtendedExtentInDomains } from '../../../../helpers/d3/extent'

interface GlyphsProps extends Visualization, Highlightable, GlyphsSettings {
  glyphSize?: number
}

const GLYPH_SPACING = 3

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
  selectAll(`.${classes.glyph}`)
    .classed(classes.selected, (d) => (d as SelectableDataType).selected)
    .classed(classes.hidden, (d) => isBrushingActive && !(d as SelectableDataType).selected)

  const createGlyphs = useCallback(() => {
    const node = component.current!
    const svg = select(node)
    svg.selectAll(`*`).remove() // clear

    const sorted = sortAttribute
      ? [...dataset].sort((a, b) => Number(a[sortAttribute]) - Number(b[sortAttribute]))
      : [...dataset]

    const [xExtent, yExtent] = [
      [0, glyphsCountPerLine],
      [0, glyphsCountPerHeight],
    ]
    const [xScale, yScale] = [
      scaleLinear([0, innerWidth]).domain(xExtent),
      scaleLinear([innerHeight, 0]).domain(yExtent),
    ]

    const extentInDomains = getExtendedExtentInDomains(displayAttributes, dataset, 5)

    const lineRadialGenerator = lineRadial()
    const radialScales = displayAttributes.map((attribute) =>
      scaleRadial([0, glyphRadius]).domain(extentInDomains[attribute]!),
    )
    const color = scaleOrdinal(schemeCategory10)

    svg
      .selectAll(`glyphs`)
      .data(dataset)
      .enter()
      .each((d, idx, elements) => {
        select(elements[idx])
          .append(`g`)
          .selectAll(`path`)
          .data([d])
          .enter()
          .append(`path`)
          .attr(`class`, classes.glyph)
          .attr(`d`, (d) =>
            lineRadialGenerator(
              displayAttributes.map((key, i) => {
                const v = d[key]
                return [(2 * Math.PI * i) / displayAttributes.length, radialScales[i](Number(v))]
              }),
            ),
          )
          .attr(`transform`, (d) => {
            const idx = sorted.indexOf(d)
            const x = idx % glyphsCountPerLine
            const y = glyphsCountPerHeight - Math.floor(idx / glyphsCountPerLine)
            return `translate(${xScale(x) + glyphRadius + margin.left}, ${yScale(y) + glyphRadius + margin.top})`
          })
          .style(`fill`, (d) => (categoryAttribute ? color(String(d[categoryAttribute])) : PLOT_COLORS.noCategoryColor))
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

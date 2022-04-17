import { FunctionComponent, useCallback, useEffect, useRef } from 'react'
import { extent, lineRadial, scaleLinear, scaleOrdinal, scaleRadial, schemeCategory10, select, selectAll } from 'd3'

import { SelectableDataType } from '../../../../types/data/data'
import { Highlightable } from '../../../../types/brushing/Brushable'
import { defaultMargin } from '../../../../types/styling/Margin'
import { PLOT_COLORS } from '../../../../styles/colors'
import { useGlyphsStyle } from './useGlyphsStyle'
import { GlyphsSettings } from '../../../../types/views/glyphs/GlyphsSettings'
import { Visualization } from '../../../../types/views/Visualization'

interface GlyphsProps extends Visualization, Highlightable, GlyphsSettings {
  glyphSize?: number
}

export const Glyphs: FunctionComponent<GlyphsProps> = ({
  dataset,
  width,
  height,
  margin = defaultMargin,
  displayAttributes,
  categoryAttribute,
  isBrushingActive,
  sortAttribute,
  glyphSize = 40,
}) => {
  const classes = useGlyphsStyle()
  const component = useRef<SVGGElement>(null)
  const innerHeight = dataset.length * 2.3

  selectAll(`.${classes.glyph}`)
    .classed(classes.selected, (d) => (d as SelectableDataType).selected)
    .classed(classes.hidden, (d) => isBrushingActive && !(d as SelectableDataType).selected)

  const createGlyphs = useCallback(() => {
    const node = component.current!

    const sortAtt = sortAttribute ? sortAttribute : displayAttributes[0]

    const svg = select(node)
    svg.selectAll(`*`).remove()
    const glyphsCountOnLine = Math.floor((width - margin.width) / glyphSize)
    const glyphsCountOnHeight = Math.floor((innerHeight - margin.height) / glyphSize)

    const sorted = [...dataset].sort((a, b) => Number(a[sortAtt]) - Number(b[sortAtt]))

    const [xExtent, yExtent] = [
      [0, glyphsCountOnLine],
      [0, glyphsCountOnHeight],
    ]
    const [xScale, yScale] = [
      scaleLinear([margin.left, width - margin.right]).domain(xExtent),
      scaleLinear([innerHeight - margin.bottom, margin.top]).domain(yExtent),
    ]

    const domainByQuantAttributesUnchecked = Object.fromEntries(
      displayAttributes.map((key) => [key, extent(dataset, (d) => Number(d[key]))]),
    )
    if (Object.values(domainByQuantAttributesUnchecked).some((domain) => domain[0] === undefined)) return
    const domainByQuantAttributes = domainByQuantAttributesUnchecked as {
      [key in keyof SelectableDataType]: [number, number]
    }

    const radialLine = lineRadial()
    const radialScales = displayAttributes.map((attribute) =>
      scaleRadial([0, glyphSize / 2]).domain(domainByQuantAttributes[attribute]),
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
            radialLine(
              displayAttributes.map((key, i) => {
                const v = d[key]
                return [(2 * Math.PI * i) / displayAttributes.length, radialScales[i](Number(v))]
              }),
            ),
          )
          .attr(`transform`, (d) => {
            const idx = sorted.indexOf(d)
            const x = idx % glyphsCountOnLine
            const y = glyphsCountOnHeight - Math.floor(idx / glyphsCountOnLine)
            return `translate(${xScale(x)}, ${yScale(y)})`
          })
          .style(`fill`, (d) => (categoryAttribute ? color(String(d[categoryAttribute])) : PLOT_COLORS.noCategoryColor))
      })
  }, [dataset, width, innerHeight, glyphSize, margin, sortAttribute, classes, categoryAttribute, displayAttributes])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => createGlyphs(), [displayAttributes, categoryAttribute, sortAttribute])

  return (
    <svg width={width} height={innerHeight} className={classes.svg}>
      <g ref={component} />
    </svg>
  )
}

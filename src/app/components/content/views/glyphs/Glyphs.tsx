import { FunctionComponent, useCallback, useEffect, useRef } from 'react'
import {
  extent, lineRadial,
  scaleLinear, scaleOrdinal, scaleRadial, schemeCategory10,
  select, selectAll,
} from 'd3'

import { SelectableDataType } from '../../../../types/data/data'
import { Highlightable } from '../../../../types/brushing/Brushable'
import { defaultMargin, Margin } from '../../../../types/styling/Margin'
import { PLOT_COLORS } from '../../../../styles/colors'
import { useGlyphsStyle } from './useGlyphsStyle'


interface GlyphsProps extends Highlightable {
  dataset: SelectableDataType[]
  width: number
  height: number
  glyphSize?: number
  margin?: Margin
  sortAttribute?: keyof SelectableDataType
  catAttribute?: keyof SelectableDataType
}

export const Glyphs: FunctionComponent<GlyphsProps> = ({
  width, height,
  dataset,
  margin = defaultMargin,
  glyphSize = 40,
  sortAttribute,
  catAttribute,
  isBrushingActive,
}) => {
  const classes = useGlyphsStyle()
  const component = useRef<SVGGElement>(null)
  const innerHeight = dataset.length * 2.3

  selectAll(`.${classes.glyph}`)
    .classed(classes.selected, (dRaw) => {
      const d = dRaw as SelectableDataType
      return d.selected
    })
    .classed(classes.hidden, (dRaw) => {
      const d = dRaw as SelectableDataType
      return isBrushingActive && !d.selected
    })

  const createGlyphs = useCallback(() => {
    const node = component.current
    if (!node)
      return

    const quantAttributes = (Object.keys(dataset[0]).filter((key) => {
      return typeof dataset[0][key] === `number`
    })) as Array<keyof SelectableDataType>
    const sortAtt = sortAttribute ? sortAttribute : quantAttributes[0]

    const svg = select(node)
    const glyphsCountOnLine = Math.floor((width - margin.width) / glyphSize)
    const glyphsContOnHeight = Math.floor((innerHeight - margin.height) / glyphSize)

    const sorted = [...dataset].sort((a, b) => Number(a[sortAtt]) - Number(b[sortAtt]))

    const [xExtent, yExtent] = [
      [0, glyphsCountOnLine],
      [0, glyphsContOnHeight],
    ]
    const [xScale, yScale] = [
      scaleLinear([margin.left, width - margin.right]).domain(xExtent),
      scaleLinear([innerHeight - margin.bottom, margin.top]).domain(yExtent),
    ]

    const domainByQuantAttributesUnchecked = Object.fromEntries(quantAttributes.map((key) => [key, extent(dataset, (d) => Number(d[key]))]))
    if (Object.values(domainByQuantAttributesUnchecked).some((domain) => domain[0] === undefined))
      return
    const domainByQuantAttributes = domainByQuantAttributesUnchecked as { [key in keyof SelectableDataType]: [number, number] }

    const radialLine = lineRadial()
    const radialScales = quantAttributes.map((attribute) =>
      scaleRadial([0, glyphSize / 2]).domain(domainByQuantAttributes[attribute]),
    )
    const color = scaleOrdinal(schemeCategory10)

    svg.selectAll(`glyphs`)
      .data(dataset).enter()
      .each((d, idx, elements) => {
        select(elements[idx])
          .append(`g`)
          .selectAll(`path`)
          .data([d]).enter()
          .append(`path`)
          .attr(`class`, classes.glyph)
          .attr(`d`, d => radialLine(quantAttributes
            .map((key, i) => {
              const v = d[key]
              return [2 * Math.PI * i / quantAttributes.length, radialScales[i](Number(v))]
            })))
          .attr(`transform`, (d) => {
            const idx = sorted.indexOf(d)
            const x = idx % glyphsCountOnLine
            const y = glyphsContOnHeight - Math.floor(idx / glyphsCountOnLine)
            return `translate(${xScale(x)}, ${yScale(y)})`
          })
          .style(`fill`, (d) => catAttribute ? color(String(d[catAttribute])) : PLOT_COLORS.noCategoryColor)
      })
  }, [dataset, width, innerHeight, glyphSize, margin, sortAttribute, classes, catAttribute])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => createGlyphs(), [])

  return (
    <svg width={width} height={innerHeight} className={classes.svg}>
      <g ref={component}/>
    </svg>
  )
}

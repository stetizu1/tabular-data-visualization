import { VoidFunctionComponent, useCallback, useEffect, useMemo, useRef } from 'react'
import {
  axisBottom,
  axisLeft,
  brush,
  D3BrushEvent,
  lineRadial,
  scaleLinear,
  scaleOrdinal,
  scaleRadial,
  select,
  selectAll,
} from 'd3'
import clsx from 'clsx'

import { SelectableDataType } from '../../../../types/data/data'
import { VisualizationView } from '../../../../types/views/VisualizationView'
import { Brushable } from '../../../../types/brushing/Brushable'
import { ScatterPlotGlyphsSettings } from '../../../../types/views/settings/ScatterPlotGlyphsSettings'
import { Margin } from '../../../../types/styling/Margin'
import { BrushSelection2d } from '../../../../types/brushing/BrushSelection'

import {
  getAttributeValuesWithLabel,
  getClass,
  getEverything,
  getTranslate,
  px,
} from '../../../../helpers/d3/stringGetters'
import { displayDetails } from '../../../../helpers/d3/displayDetails'
import { getExtentInDomains } from '../../../../helpers/d3/extent'
import { getCategoryColor } from '../../../../helpers/d3/attributeGetters'
import { isInRanges } from '../../../../helpers/basic/range'

import { ViewType } from '../../../../constants/views/ViewTypes'
import { SAVE_ID } from '../../../../constants/save/save'
import { SVG } from '../../../../constants/svg'
import { MouseActions } from '../../../../constants/actions/MouseActions'
import { TOOLTIP, TOOLTIP_CLASS } from '../../../../constants/views/tooltip'
import { HTML } from '../../../../constants/html'
import { BrushAction } from '../../../../constants/actions/BrushAction'
import { MIN_SCATTER_PLOT_GLYPHS_ATTRIBUTE_COUNT } from '../../../../constants/views/scatterPlotGlyphs'

import { SCATTER_PLOT_GLYPHS_TEXT } from '../../../../text/views-and-menus/scatterPlotGlyphs'

import { useScatterPlotGlyphsStyle } from '../../../../components-style/content/views/scatter-plot-glyphs/useScatterPlotGlyphsStyle'

const SCATTER_PLOT_GLYPHS = `scatterPlotGlyphs`
const AXIS_X = `axisX`
const AXIS_Y = `axisY`

export interface ScatterPlotGlyphsProps extends VisualizationView, Brushable, ScatterPlotGlyphsSettings {}

export const ScatterPlotGlyphs: VoidFunctionComponent<ScatterPlotGlyphsProps> = ({
  width,
  height,
  dataset,
  setDataSelected,
  displayAttributes,
  xAttribute,
  yAttribute,
  categoryAttribute,
  registerCleanBrushing,
  setComponentBrushing,
  isBrushingActive,
  isDetailsVisible,
  isBrushingOnEndOfMove,
  colorCategory,
  glyphSize,
  margins,
  opacity,
}) => {
  const margin = useMemo(() => new Margin(...margins), [margins])
  const classes = useScatterPlotGlyphsStyle({ width, height, margin, opacity })
  const component = useRef<SVGGElement>(null)
  const color = scaleOrdinal(colorCategory)

  const [innerWidth, innerHeight] = [width - margin.width - glyphSize, height - margin.height - glyphSize]

  const createScatterPlotGlyphs = useCallback(() => {
    const node = component.current!
    const svg = select(node)
    svg.selectAll(getEverything()).remove() // clear

    const extentInDomains = getExtentInDomains([...displayAttributes, xAttribute, yAttribute], dataset)

    const [xScale, yScale] = [
      scaleLinear([0, innerWidth]).domain(extentInDomains[xAttribute]),
      scaleLinear([innerHeight, 0]).domain(extentInDomains[yAttribute]),
    ]

    const lineRadialGenerator = lineRadial()
    const radialScales = displayAttributes.map((attribute) =>
      scaleRadial([0, glyphSize / 2]).domain(extentInDomains[attribute]),
    )

    const getGlyphPath = (data: SelectableDataType) =>
      lineRadialGenerator(
        displayAttributes.map((key, idx) => [
          (2 * Math.PI * idx) / displayAttributes.length,
          radialScales[idx](Number(data[key])),
        ]),
      )

    const tooltip = select(getClass(TOOLTIP_CLASS))
    svg
      .selectAll(SCATTER_PLOT_GLYPHS)
      .data(dataset)
      .enter()
      .each((data, idx, elements) => {
        select(elements[idx])
          .append(SVG.elements.g)
          .selectAll(SVG.elements.path)
          .data([data])
          .enter()
          .append(SVG.elements.path)
          .attr(SVG.attributes.class, clsx(classes.glyph, SCATTER_PLOT_GLYPHS))
          .attr(SVG.attributes.d, getGlyphPath)
          .attr(
            SVG.attributes.transform,
            getTranslate([xScale(Number(data[xAttribute])), yScale(Number(data[yAttribute]))]),
          )
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
          .style(SVG.style.fill, getCategoryColor(categoryAttribute, color))
      })

    const axisX = svg
      .selectAll(AXIS_X)
      .data(dataset)
      .enter()
      .append(SVG.elements.g)
      .attr(SVG.attributes.transform, getTranslate([0, innerHeight]))
      .attr(SVG.attributes.class, classes.axis)
    axisX.call(axisBottom(xScale))
    svg
      .selectAll(AXIS_Y)
      .data(dataset)
      .enter()
      .append(SVG.elements.g)
      .attr(SVG.attributes.class, classes.axis)
      .call(axisLeft(yScale))
    const setBrushingSelection = (selection: BrushSelection2d) => {
      if (selection) {
        setDataSelected((data) =>
          isInRanges(selection, xScale(Number(data[xAttribute])), yScale(Number(data[yAttribute]))),
        )
      }
    }

    const makeBrush = brush()
      .on(BrushAction.start, () => {
        setComponentBrushing(ViewType.ScatterPlotGlyphs)
      })
      .on(BrushAction.move, ({ selection }: D3BrushEvent<SelectableDataType>) => {
        if (!isBrushingOnEndOfMove) {
          const brushSelection = selection as BrushSelection2d
          setBrushingSelection(brushSelection)
        }
      })
      .on(BrushAction.end, ({ selection }: D3BrushEvent<SelectableDataType>) => {
        const brushSelection = selection as BrushSelection2d
        setBrushingSelection(brushSelection)
        if (!brushSelection) {
          setComponentBrushing(null)
        }
      })
      .extent([
        [-glyphSize / 2, -glyphSize / 2],
        [innerWidth + glyphSize / 2, innerHeight + glyphSize / 2],
      ])
    svg.call(makeBrush)
    registerCleanBrushing(() => {
      brush().clear(svg)
    })
  }, [
    dataset,
    classes,
    innerWidth,
    innerHeight,
    setDataSelected,
    setComponentBrushing,
    xAttribute,
    yAttribute,
    displayAttributes,
    categoryAttribute,
    glyphSize,
    color,
    registerCleanBrushing,
    isBrushingOnEndOfMove,
  ])

  useEffect(
    () => createScatterPlotGlyphs(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      displayAttributes,
      categoryAttribute,
      innerWidth,
      innerHeight,
      glyphSize,
      isBrushingOnEndOfMove,
      colorCategory,
      xAttribute,
      yAttribute,
    ],
  )

  selectAll(getClass(SCATTER_PLOT_GLYPHS))
    .classed(classes.selected, (d) => (d as SelectableDataType).selected)
    .classed(classes.hidden, (d) => isBrushingActive && !(d as SelectableDataType).selected)

  displayDetails(isDetailsVisible, classes.duplicates)

  if (displayAttributes.length >= MIN_SCATTER_PLOT_GLYPHS_ATTRIBUTE_COUNT) {
    return (
      <>
        <svg width={width} height={height} className={classes.svg} id={SAVE_ID[ViewType.ScatterPlotGlyphs]}>
          <g ref={component} transform={getTranslate([margin.left + glyphSize / 2, margin.top + glyphSize / 2])} />
        </svg>
        <div className={TOOLTIP_CLASS} />
      </>
    )
  }
  return <div className={classes.notDisplayed}>{SCATTER_PLOT_GLYPHS_TEXT.unavailable}</div>
}

import { FunctionComponent, useCallback, useEffect, useRef } from 'react'
import {
  axisBottom,
  axisLeft, brush,
  D3BrushEvent,
  extent,
  scaleLinear,
  scaleOrdinal,
  schemeCategory10,
  select, selectAll,
  ValueFn,
} from 'd3'
import clsx from 'clsx'

import { otherCasesToWhitespaces } from '../../../../helpers/data/formatText'
import { QuantitativeVisualization } from '../../../../types/view/QuantitativeVisualization'
import { SelectableDataType } from '../../../../types/data/data'
import { Brushable } from '../../../../types/brushing/Brushable'
import { BrushAction } from '../../../../types/brushing/BrushAction'
import { Margin } from '../../../../types/styling/Margin'
import { PLOT_COLORS } from '../../../../styles/colors'
import { isBrushed } from './brushing'
import { useScatterPlotMatrixStyle } from './useScatterPlotMatrixStyle'


interface ScatterPlotMatrixProps extends Brushable, QuantitativeVisualization {
  circleSize?: number
}

interface MatrixItem<T> {
  i: number
  j: number
  keyX: keyof T
  keyY: keyof T
}

export const ScatterPlotMatrix: FunctionComponent<ScatterPlotMatrixProps> = ({
  width,
  height,
  dataset,
  setSelected,
  circleSize = 4,
  displayAttributes,
  categoryAttribute,
  cleanBrushes, setCleanBrushes, setComponentBrushing,
  isBrushingActive,
}) => {
  const classes = useScatterPlotMatrixStyle()
  const component = useRef<SVGGElement>(null)
  // noinspection JSSuspiciousNameCombination
  const size = width < height ? width : height

  selectAll(`.${classes.circle}`)
    .classed(classes.selected, (dRaw) => {
      const d = dRaw as SelectableDataType
      return d.selected
    })
    .classed(classes.hidden, (dRaw) => {
      const d = dRaw as SelectableDataType
      return isBrushingActive && !d.selected
    })

  const createScatterPlotMatrix = useCallback(() => {
    const margin = new Margin(14, 14, 14, 14)
    const node = component.current
    if (!node) {
      return
    }
    const makeMatrix = (keys: (keyof SelectableDataType)[]): MatrixItem<SelectableDataType>[] => keys
      .map((keyX, i) => keys
        .map((keyY, j) => ({ i, j, keyX, keyY })))
      .flat()

    const quantCount = displayAttributes.length

    const domainByQuantAttributesUnchecked = Object.fromEntries(displayAttributes.map((key) => [key, extent(dataset, (d) => Number(d[key]))]))
    if (Object.values(domainByQuantAttributesUnchecked).some((domain) => domain[0] === undefined))
      return
    const domainByQuantAttributes = domainByQuantAttributesUnchecked as { [key in keyof SelectableDataType]: [number, number] }

    const rect = {
      width: size / quantCount - margin.left,
      height: size / quantCount - margin.top,
    }

    const [x, y] = [
      scaleLinear([margin.left, rect.width - margin.left]),
      scaleLinear([rect.height - margin.top, margin.top]),
    ]

    const [xAxis, yAxis] = [axisBottom(x).ticks(6), axisLeft(y).ticks(6)]
    const color = scaleOrdinal(schemeCategory10)

    xAxis.tickSize(rect.width * quantCount)
    yAxis.tickSize(-1 * rect.height * quantCount)

    const group = select(node)
      .attr(`width`, rect.width * quantCount + margin.width)
      .attr(`height`, rect.height * quantCount + margin.height)
      .attr(`transform`, `translate(${margin.width}, ${margin.top})`)

    group.selectAll(`.${classes.x}.${classes.axis}`)
      .data(displayAttributes).enter()
      .append(`g`)
      .attr(`class`, clsx(classes.x, classes.axis))
      .attr(`transform`, (d, i) => `translate(${(quantCount - i - 1) * rect.width}, 0)`)
      .each((d, idx, elements) => {
        x.domain(domainByQuantAttributes[d])
        select(elements[idx]).call(xAxis)
      })

    group.selectAll(`.${classes.y}.${classes.axis}`)
      .data(displayAttributes).enter()
      .append(`g`)
      .attr(`class`, clsx(classes.y, classes.axis))
      .attr(`transform`, (d, i) => `translate(0,${i * rect.height})`)
      .each((d, idx, elements) => {
        y.domain(domainByQuantAttributes[d])
        select(elements[idx]).call(yAxis)
      })

    const plot: ValueFn<SVGGElement, MatrixItem<SelectableDataType>, void> = (p, idx, elements) => {
      const cell = select(elements[idx])

      x.domain(domainByQuantAttributes[p.keyX])
      y.domain(domainByQuantAttributes[p.keyY])

      cell.append(`rect`)
        .attr(`class`, classes.frame)
        .attr(`x`, margin.left)
        .attr(`y`, margin.top)
        .attr(`width`, rect.width - margin.width)
        .attr(`height`, rect.height - margin.height)

      cell.selectAll(`circle`)
        .data(dataset).enter()
        .append(`circle`)
        .attr(`cx`, (d) => x(Number(d[p.keyX])))
        .attr(`cy`, (d) => y(Number(d[p.keyY])))
        .attr(`r`, circleSize)
        .attr(`class`, classes.circle)
        .style(`fill`, (d) => categoryAttribute ? color(String(d[categoryAttribute])) : PLOT_COLORS.noCategoryColor)
    }

    const cell = group.selectAll(`.${classes.cell}`)
      .data(makeMatrix(displayAttributes)).enter()
      .append(`g`)
      .attr(`class`, classes.cell)
      .attr(`transform`, (d) => `translate(${(quantCount - d.i - 1) * rect.width}, ${d.j * rect.height})`)
      .each(plot)

    cell.filter((d) => d.i === d.j)
      .append(`text`)
      .attr(`x`, margin.width)
      .attr(`y`, margin.height + margin.top)
      .text((d) => otherCasesToWhitespaces(String(d.keyX)))

    let brushCell = { i: -1, j: -1 }

    const clearBrush = () => {
      cell.each((d, idx, elements) => {
        brush().clear(select(elements[idx]))
      })
    }

    setCleanBrushes((prev) => [...prev, () => {
      clearBrush()
      brushCell = { i: -1, j: -1 }
      dataset.forEach((data) => data.selected = false)
      setSelected(dataset.map((data) => data.selected))
    }])

    const startBrush = (_: D3BrushEvent<SelectableDataType>, { i, j, keyX, keyY }: MatrixItem<SelectableDataType>) => {
      cleanBrushes(node)
      setComponentBrushing(node)
      if (brushCell.i !== i || brushCell.j !== j) {
        clearBrush()
        brushCell = { i, j }
        x.domain(domainByQuantAttributes[keyX])
        y.domain(domainByQuantAttributes[keyY])
      }
    }

    const moveBrush = ({ selection }: D3BrushEvent<SelectableDataType>, { keyX, keyY }: MatrixItem<SelectableDataType>) => {
      if (selection) {
        const extent = selection as [[number, number], [number, number]]
        selectAll(`.${classes.circle}`)
          .each((dRaw) => {
            const d = dRaw as SelectableDataType
            d.selected = isBrushed(extent, x(Number(d[keyX])), y(Number(d[keyY])))
          })
        setSelected(dataset.map((data) => data.selected))
      }
    }

    const endBrush = ({ selection }: D3BrushEvent<SelectableDataType>) => {
      if (!selection) {
        dataset.forEach((data) => data.selected = false)
        setSelected(dataset.map((data) => data.selected))
        setComponentBrushing(null)
      }
    }

    const makeBrush = brush<MatrixItem<SelectableDataType>>()
      .on(BrushAction.start, startBrush)
      .on(BrushAction.move, moveBrush)
      .on(BrushAction.end, endBrush)
      .extent([[0, 0], [rect.width, rect.height]])

    cell.call(makeBrush)
  }, [
    dataset, size, circleSize, classes, setSelected, categoryAttribute, displayAttributes,
    cleanBrushes, setComponentBrushing, setCleanBrushes,
  ])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => createScatterPlotMatrix(), [])

  return (
    <svg width={size} height={size} className={classes.svg}>
      <g ref={component}/>
    </svg>
  )
}

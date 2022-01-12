import { useCallback, useEffect, useRef } from 'react'
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

import { otherCasesToWhitespaces } from '../helpers/formatText'
import { SelectableDataType } from '../helpers/data'
import { Margin, marginHeight, marginWidth } from '../styles/margin'
import { COLORS } from '../styles/colors'
import { BrushActions } from '../helpers/BrushActions'
import { isBrushed } from './brushing'
import { useScatterPlotMatrixStyle } from './useScatterPlotMatrixStyle'


interface ScatterPlotMatrixProps<T extends SelectableDataType> {
  dataset: T[]
  width: number
  setSelected: (selected: boolean[]) => void
  circleSize?: number
}

interface MatrixItem<T> {
  i: number
  j: number
  keyX: keyof T
  keyY: keyof T
}

export const ScatterPlotMatrix = <T extends SelectableDataType>({
  width,
  dataset,
  setSelected,
  circleSize = 4,
}: ScatterPlotMatrixProps<T>) => {
  const classes = useScatterPlotMatrixStyle()
  const component = useRef<SVGGElement>(null)
  // noinspection JSSuspiciousNameCombination
  const height = width
  let someSelected = false

  selectAll(`.${classes.circle}`)
    .classed(classes.selected, (dRaw) => {
      const d = dRaw as T
      if (d.selected)
        someSelected = true
      return d.selected
    })
    .classed(classes.hidden, (dRaw) => {
      const d = dRaw as T
      return someSelected && !d.selected
    })

  const createScatterPlotMatrix = useCallback(() => {
    const margin: Margin = { right: 14, left: 14, top: 14, bottom: 14 }
    const node = component.current
    if (!node) {
      return
    }
    const makeMatrix = (keys: (keyof T)[]): MatrixItem<T>[] => keys
      .map((keyX, i) => keys
        .map((keyY, j) => ({ i, j, keyX, keyY })))
      .flat()

    const quantAttributes = (Object.keys(dataset[0]).filter((key) => {
      return typeof dataset[0][key] === `number`
    })) as Array<keyof T>
    const quantCount = quantAttributes.length
    const category = Object.keys(dataset[0]).find((key) => typeof dataset[0][key] === `string`) as keyof T | undefined

    const domainByTraitsUnchecked = Object.fromEntries(quantAttributes.map((key) => [key, extent(dataset, (d) => Number(d[key]))]))
    if (Object.values(domainByTraitsUnchecked).some((domain) => domain[0] === undefined))
      return
    const domainByQuantAttributes = domainByTraitsUnchecked as { [key in keyof T]: [number, number] }

    const rect = {
      width: width / quantCount - margin.left,
      height: height / quantCount - margin.top,
    }

    const [x, y] = [
      scaleLinear().range([margin.left, rect.width - margin.left]),
      scaleLinear().range([rect.height - margin.top, margin.top]),
    ]

    const [xAxis, yAxis] = [axisBottom(x).ticks(6), axisLeft(y).ticks(6)]
    const color = scaleOrdinal(schemeCategory10)

    xAxis.tickSize(rect.width * quantCount)
    yAxis.tickSize(-1 * rect.height * quantCount)

    const group = select(node)
      .attr(`width`, rect.width * quantCount + marginWidth(margin))
      .attr(`height`, rect.height * quantCount + marginHeight(margin))
      .attr(`transform`, `translate(${marginWidth(margin)}, ${margin.top})`)

    group.selectAll(`.${classes.x}.${classes.axis}`)
      .data(quantAttributes)
      .enter().append(`g`)
      .attr(`class`, clsx(classes.x, classes.axis))
      .attr(`transform`, (d, i) => `translate(${(quantCount - i - 1) * rect.width}, 0)`)
      .each((d, idx, elements) => {
        x.domain(domainByQuantAttributes[d])
        select(elements[idx]).call(xAxis)
      })

    group.selectAll(`.${classes.y}.${classes.axis}`)
      .data(quantAttributes)
      .enter().append(`g`)
      .attr(`class`, clsx(classes.y, classes.axis))
      .attr(`transform`, (d, i) => `translate(0,${i * rect.height})`)
      .each((d, idx, elements) => {
        y.domain(domainByQuantAttributes[d])
        select(elements[idx]).call(yAxis)
      })

    const plot: ValueFn<SVGGElement, MatrixItem<T>, void> = (p, idx, elements) => {
      const cell = select(elements[idx])

      x.domain(domainByQuantAttributes[p.keyX])
      y.domain(domainByQuantAttributes[p.keyY])

      cell.append(`rect`)
        .attr(`class`, classes.frame)
        .attr(`x`, margin.left)
        .attr(`y`, margin.top)
        .attr(`width`, rect.width - marginWidth(margin))
        .attr(`height`, rect.height - marginHeight(margin))

      cell.selectAll(`circle`)
        .data(dataset)
        .enter().append(`circle`)
        .attr(`cx`, (d) => x(Number(d[p.keyX])))
        .attr(`cy`, (d) => y(Number(d[p.keyY])))
        .attr(`r`, circleSize)
        .attr(`class`, classes.circle)
        .style(`fill`, (d) => category ? color(String(d[category])) : COLORS.scatterPlotNoCategoryColor)
    }

    const cell = group.selectAll(`.${classes.cell}`)
      .data(makeMatrix(quantAttributes))
      .enter().append(`g`)
      .attr(`class`, classes.cell)
      .attr(`transform`, (d) => `translate(${(quantCount - d.i - 1) * rect.width}, ${d.j * rect.height})`)
      .each(plot)

    cell.filter((d) => d.i === d.j)
      .append(`text`)
      .attr(`x`, marginWidth(margin))
      .attr(`y`, marginHeight(margin) + margin.top)
      .text((d) => otherCasesToWhitespaces(String(d.keyX)))

    let brushCell = { i: -1, j: -1 }
    const startBrush = (_: D3BrushEvent<T>, { i, j, keyX, keyY }: MatrixItem<T>) => {
      if (brushCell.i !== i || brushCell.j !== j) {
        cell.each((d, idx, elements) => {
          brush().clear(select(elements[idx]))
        })
        brushCell = { i, j }
        x.domain(domainByQuantAttributes[keyX])
        y.domain(domainByQuantAttributes[keyY])
      }
    }

    const moveBrush = ({ selection }: D3BrushEvent<T>, { keyX, keyY }: MatrixItem<T>) => {
      if (selection) {
        const extent = selection as [[number, number], [number, number]]
        selectAll(`.${classes.circle}`)
          .each((dRaw) => {
            const d = dRaw as T
            d.selected = isBrushed(extent, x(Number(d[keyX])), y(Number(d[keyY])))
          })
        setSelected(dataset.map((data) => data.selected))
      }
    }

    const endBrush = ({ selection }: D3BrushEvent<T>) => {
      if (!selection) {
        dataset.forEach((data) => data.selected = false)
        setSelected(dataset.map((data) => data.selected))
      }
    }

    const makeBrush = brush<MatrixItem<T>>()
      .on(BrushActions.start, startBrush)
      .on(BrushActions.move, moveBrush)
      .on(BrushActions.end, endBrush)
      .extent([[0, 0], [rect.width, rect.height]])

    cell.call(makeBrush)
  }, [dataset, height, width, circleSize, classes, setSelected])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => createScatterPlotMatrix(), [])

  return (
    <svg width={width} height={height} className={classes.svg}>
      <g ref={component}/>
    </svg>
  )
}

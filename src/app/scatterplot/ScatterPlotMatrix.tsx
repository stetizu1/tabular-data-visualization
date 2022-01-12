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
import { Margin, marginHeight, marginWidth } from '../styles/margin'
import { COLORS } from '../styles/colors'
import { isBrushed } from './brushing'
import { useScatterPlotMatrixStyle } from './useScatterPlotMatrixStyle'


interface ScatterPlotMatrixProps<T extends Record<string, number | string | null>> {
  dataset: T[]
  width: number
  circleSize?: number
}

interface MatrixItem<T> {
  i: number
  j: number
  keyX: keyof T
  keyY: keyof T
}

export const ScatterPlotMatrix = <T extends Record<string, number | string | null>>({
  width,
  dataset,
  circleSize = 4,
}: ScatterPlotMatrixProps<T>) => {
  const classes = useScatterPlotMatrixStyle()
  const component = useRef<SVGGElement>(null)
  // noinspection JSSuspiciousNameCombination
  const height = width

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
      return !isNaN(Number(dataset[0][key]))
    })) as Array<keyof T>
    const quantCount = quantAttributes.length
    const category = Object.keys(dataset[0]).find((key) => isNaN(Number(dataset[0][key]))) as keyof T | undefined

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

    const cell = group.selectAll(`.cell`)
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
    function startBrush (p: D3BrushEvent<T>, item: MatrixItem<T>) {
      if (brushCell.i !== item.i || brushCell.j !== item.j) {
        cell.each((d, idx, elements) => {
          brush().clear(select(elements[idx]))
        })
        brushCell = { i: item.i, j: item.j }
        x.domain(domainByQuantAttributes[item.keyX])
        y.domain(domainByQuantAttributes[item.keyY])
      }
    }

    function moveBrush (p: D3BrushEvent<T>, item: MatrixItem<T>) {
      if (p.selection) {
        const extent = p.selection as [[number, number], [number, number]]
        const circles = selectAll(`circle`)
        circles.classed(classes.selected, (dRaw) => {
          const d = dRaw as T
          return isBrushed(extent, x(Number(d[item.keyX])), y(Number(d[item.keyY])))
        })
        circles.classed(classes.hidden, (dRaw) => {
          const d = dRaw as T
          return !isBrushed(extent, x(Number(d[item.keyX])), y(Number(d[item.keyY])))
        })
      }
    }

    function endBrush (p: D3BrushEvent<T>) {
      if (!p.selection) {
        selectAll(`.${classes.hidden}`).classed(classes.hidden, false)
        selectAll(`.${classes.selected}`).classed(classes.selected, false)
      }
    }

    const makeBrush = brush<MatrixItem<T>>()
      .on(`start`, startBrush)
      .on(`brush`, moveBrush)
      .on(`end`, endBrush)
      .extent([[0, 0], [rect.width, rect.height]])

    cell.call(makeBrush)
  }, [dataset, height, width, circleSize, classes])
  useEffect(() => createScatterPlotMatrix())

  return (
    <svg width={width} height={height} className={classes.svg}>
      <g className={`body`} ref={component}/>
    </svg>
  )
}

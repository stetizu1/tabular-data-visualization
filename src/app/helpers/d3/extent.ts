import { extent } from 'd3'

import { SelectableDataType } from '../../types/data/data'

export type ExtentInDomains = { [key: keyof SelectableDataType]: [number, number] }

export const getExtentInDomains = (
  domains: Array<keyof SelectableDataType>,
  dataset: SelectableDataType[],
): ExtentInDomains =>
  Object.fromEntries(
    domains.map((key) => {
      const calculatedExtent = extent(dataset, (d) => Number(d[key]))
      if (calculatedExtent[0] === undefined) throw new Error(`Invalid prop to create extend from`)
      return [key, calculatedExtent]
    }),
  )

export const getExtendedExtentInDomains = (
  domains: Array<keyof SelectableDataType>,
  dataset: SelectableDataType[],
  percentDown: number,
  percentUp = 0,
): ExtentInDomains =>
  Object.fromEntries(
    domains.map((key) => {
      const calculatedExtent = extent(dataset, (d) => Number(d[key]))
      if (calculatedExtent[0] === undefined) throw new Error(`Invalid prop to create extend from`)
      const extentSize = calculatedExtent[1] - calculatedExtent[0]
      const p = [-(percentDown / 100) * extentSize, (percentUp / 100) * extentSize]
      const finalExtent: [number, number] = [calculatedExtent[0] + p[0], calculatedExtent[1] + p[1]]
      return [key, finalExtent]
    }),
  )

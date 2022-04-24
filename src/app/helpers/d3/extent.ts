import { extent } from 'd3'

import { ExtentReqForSelectableDataType, SelectableDataType } from '../../types/data/data'

export const getExtentInDomains = (
  domains: Array<keyof SelectableDataType>,
  dataset: ReadonlyArray<SelectableDataType>,
): ExtentReqForSelectableDataType =>
  Object.fromEntries(
    domains.map((key) => {
      const calculatedExtent = extent(dataset, (d) => Number(d[key]))
      if (calculatedExtent[0] === undefined) throw new Error(`Invalid prop to create extent from`)
      return [key, calculatedExtent]
    }),
  )

export const getExtendedExtentInDomains = (
  domains: Array<keyof SelectableDataType>,
  dataset: ReadonlyArray<SelectableDataType>,
  percentDown: number,
  percentUp = 0,
): ExtentReqForSelectableDataType =>
  Object.fromEntries(
    domains.map((key) => {
      const calculatedExtent = extent(dataset, (d) => Number(d[key]))
      if (calculatedExtent[0] === undefined) throw new Error(`Invalid prop to create extent from`)
      const extentSize = calculatedExtent[1] - calculatedExtent[0]
      const p = [-(percentDown / 100) * extentSize, (percentUp / 100) * extentSize]
      const finalExtent: [number, number] = [calculatedExtent[0] + p[0], calculatedExtent[1] + p[1]]
      return [key, finalExtent]
    }),
  )

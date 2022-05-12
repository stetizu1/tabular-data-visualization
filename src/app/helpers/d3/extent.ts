/**
 * Functions to get value extents
 */
import { extent } from 'd3'

import { ExtentReqForSelectableDataType, SelectableDataType } from '../../types/data/data'

/**
 * Return extent of values for given attributes (domains)
 * @param domains - attributes for which we determine the extent
 * @param dataset
 */
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

/**
 * Return extent of values for given attributes (domains), with the extension up and down by percent (moves minimum/maximum)
 * @param domains - attributes for which we determine the extent
 * @param dataset
 * @param percentDown - how many percent should be added on minima side
 * @param percentUp - how many percent should be added on maxima side
 */
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

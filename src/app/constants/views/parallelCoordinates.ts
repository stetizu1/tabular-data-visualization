import { schemeCategory10 } from 'd3'

import { ColorArray } from '../../types/styling/ColorArray'
import { ParallelCoordinatesSettings } from '../../types/views/settings/ParallelCoordinatesSettings'

/**
 * Minimal attribute count for parallel coordinates
 */
export const MIN_PARALLEL_COORDINATES_ATTRIBUTE_COUNT = 2

/**
 * Default values for parallel coordinates settings
 */
export const PARALLEL_COORDINATES_DEFAULT: Pick<
  ParallelCoordinatesSettings,
  `margins` | `lineWidth` | `opacity` | `colorCategory`
> = {
  margins: [10, 55, 25, 60],
  lineWidth: 1,
  opacity: [50, 60, 20],
  colorCategory: schemeCategory10 as ColorArray,
}

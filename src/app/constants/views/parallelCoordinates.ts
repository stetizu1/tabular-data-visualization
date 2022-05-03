import { schemeCategory10 } from 'd3'
import { ParallelCoordinatesSettings } from '../../types/views/settings/ParallelCoordinatesSettings'
import { ColorArray } from '../../types/styling/ColorArray'

export const MIN_PARALLEL_COORDINATES_ATTRIBUTE_COUNT = 2

export const PARALLEL_COORDINATES_DEFAULT: Pick<
  ParallelCoordinatesSettings,
  `margins` | `lineWidth` | `opacity` | `colorCategory`
> = {
  margins: [20, 55, 25, 60],
  lineWidth: 1,
  opacity: [50, 60, 20],
  colorCategory: schemeCategory10 as ColorArray,
}

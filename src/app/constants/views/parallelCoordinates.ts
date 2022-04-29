import { ParallelCoordinatesSettings } from '../../types/views/parallel-coordinates/ParallelCoordinatesSettings'

export const MIN_PARALLEL_COORDINATES_ATTRIBUTE_COUNT = 2

export const PARALLEL_COORDINATES_DEFAULT: Pick<ParallelCoordinatesSettings, `margins` | `lineWidth` | `opacity`> = {
  margins: [20, 40, 25, 56],
  lineWidth: 1,
  opacity: [50, 60, 20],
}

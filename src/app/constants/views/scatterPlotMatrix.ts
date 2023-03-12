import { schemeCategory10 } from 'd3'

import { ColorArray } from '@/types/styling/ColorArray'
import { ScatterPlotMatrixSettings } from '@/types/views/settings/ScatterPlotMatrixSettings'

/**
 * Minimal attribute count for scatter plot matrix
 */
export const MIN_SCATTER_PLOT_MATRIX_ATTRIBUTE_COUNT = 2

/**
 * Default values for scatter plot matrix settings
 */
export const SCATTER_PLOT_MATRIX_DEFAULT: Pick<
  ScatterPlotMatrixSettings,
  `margins` | `pointSize` | `opacity` | `colorCategory` | `horizontalSpacing` | `verticalSpacing`
> = {
  margins: [15, 15, 20, 30],
  pointSize: 3,
  horizontalSpacing: 12,
  verticalSpacing: 12,
  opacity: [45, 80, 15],
  colorCategory: schemeCategory10 as ColorArray,
}

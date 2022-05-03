import { schemeCategory10 } from 'd3'
import { ScatterPlotMatrixSettings } from '../../types/views/settings/ScatterPlotMatrixSettings'
import { ColorArray } from '../../types/styling/ColorArray'

export const MIN_SCATTER_PLOT_MATRIX_ATTRIBUTE_COUNT = 2

export const SCATTER_PLOT_MATRIX_DEFAULT: Pick<
  ScatterPlotMatrixSettings,
  `margins` | `pointSize` | `opacity` | `colorCategory`
> = {
  margins: [25, 20, 25, 45],
  pointSize: 4,
  opacity: [70, 80, 15],
  colorCategory: schemeCategory10 as ColorArray,
}

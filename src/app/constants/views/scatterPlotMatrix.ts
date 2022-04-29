import { ScatterPlotMatrixSettings } from '../../types/views/scatter-plot/ScatterPlotMatrixSettings'

export const MIN_SCATTER_PLOT_MATRIX_ATTRIBUTE_COUNT = 2

export const SCATTER_PLOT_MATRIX_DEFAULT: Pick<ScatterPlotMatrixSettings, `margins` | `pointSize` | `opacity`> = {
  margins: [25, 20, 25, 45],
  pointSize: 4,
  opacity: [70, 80, 15],
}

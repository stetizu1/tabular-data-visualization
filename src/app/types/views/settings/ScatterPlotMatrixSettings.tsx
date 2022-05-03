import { ViewVisualizationSettings } from './VisualizationSettings'

export const pointSizeKey = `pointSize`

/**
 * Settings for Scatter Plot Matrix view
 */
export interface ScatterPlotMatrixSettings extends ViewVisualizationSettings {
  /**
   * Size of a data point
   */
  [pointSizeKey]: number
}

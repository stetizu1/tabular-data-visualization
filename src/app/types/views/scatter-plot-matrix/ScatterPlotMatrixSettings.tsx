import { QuantitativeVisualizationSettings } from '../QuantitativeVisualizationSettings'

export const pointSizeKey = `pointSize`

/**
 * Settings for Scatter Plot Matrix view
 */
export interface ScatterPlotMatrixSettings extends QuantitativeVisualizationSettings {
  /**
   * Size of a data point
   */
  [pointSizeKey]: number
}

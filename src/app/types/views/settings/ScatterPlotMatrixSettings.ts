import { ViewVisualizationSettings } from './VisualizationSettings'

export const pointSizeKey = `pointSize`
export const horizontalSpacingKey = `horizontalSpacing`
export const verticalSpacingKey = `verticalSpacing`

/**
 * Settings for Scatter Plot Matrix view
 */
export interface ScatterPlotMatrixSettings extends ViewVisualizationSettings {
  /**
   * Size of a data point
   */
  [pointSizeKey]: number

  /**
   * Size of horizontal spacing
   */
  [horizontalSpacingKey]: number

  /**
   * Size of vertical spacing
   */
  [verticalSpacingKey]: number
}

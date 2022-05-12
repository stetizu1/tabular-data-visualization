/**
 * Settings for scatter plot matrix
 */
import { ViewVisualizationSettings } from './VisualizationSettings'

// keys for additional attributes
export const pointSizeKey = `pointSize`
export const horizontalSpacingKey = `horizontalSpacing`
export const verticalSpacingKey = `verticalSpacing`

/**
 * Settings for scatter plot matrix view
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

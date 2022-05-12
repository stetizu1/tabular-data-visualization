/**
 * Settings for parallel coordinates
 */
import { ViewVisualizationSettings } from './VisualizationSettings'

// keys for additional attributes
export const lineWidthKey = `lineWidth`

/**
 * Settings for parallel coordinates view
 */
export interface ParallelCoordinatesSettings extends ViewVisualizationSettings {
  /**
   * Width of a data line
   */
  [lineWidthKey]: number
}

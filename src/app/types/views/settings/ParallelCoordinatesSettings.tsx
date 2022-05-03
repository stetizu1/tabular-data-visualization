import { ViewVisualizationSettings } from './VisualizationSettings'

export const lineWidthKey = `lineWidth`

/**
 * Settings for Parallel Coordinates view
 */
export interface ParallelCoordinatesSettings extends ViewVisualizationSettings {
  /**
   * Width of a data line
   */
  [lineWidthKey]: number
}

import { QuantitativeVisualizationSettings } from '../QuantitativeVisualizationSettings'

export const lineWidthKey = `lineWidth`

/**
 * Settings for Parallel Coordinates view
 */
export interface ParallelCoordinatesSettings extends QuantitativeVisualizationSettings {
  /**
   * Width of a data line
   */
  [lineWidthKey]: number
}

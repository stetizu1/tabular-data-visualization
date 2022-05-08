import { ColoringFrom } from '../../../constants/data/ColoringFrom'
import { BaseViewVisualizationSettings } from './VisualizationSettings'

export const tabWidthKey = `tabWidth`
export const tabSpacingKey = `tabSpacing`
export const tabGapKey = `tabGap`
export const coloringFromKey = `coloringFrom`

/**
 * Settings for Parallel Sets Bundled view
 */
export interface ParallelSetsBundledSettings extends BaseViewVisualizationSettings {
  /**
   * Width of a tab
   */
  [tabWidthKey]: number

  /**
   * Spacing of tabs
   */
  [tabSpacingKey]: number

  /**
   * Gap between tabs (vertically)
   */
  [tabGapKey]: number

  /**
   * Is coloring from left side
   */
  [coloringFromKey]: ColoringFrom
}

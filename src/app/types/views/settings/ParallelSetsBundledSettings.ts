import { ColoringType } from '../../../constants/data/ColoringType'
import { ParallelSetsBrushingType } from '../../../constants/data/ParallelSetsBrushingType'

import { BaseViewVisualizationSettings } from './VisualizationSettings'

export const tabWidthKey = `tabWidth`
export const tabSpacingKey = `tabSpacing`
export const tabGapKey = `tabGap`
export const coloringTypeKey = `coloringType`
export const brushingTypeKey = `brushingType`
export const fontColorKey = `fontColor`

/**
 * Settings for Parallel Sets Bundled view
 */
export interface ParallelSetsBundledSettings extends BaseViewVisualizationSettings {
  /**
   * Is coloring from left side
   */
  [coloringTypeKey]: ColoringType

  /**
   * Brushing - displayed from top top or overlay
   */
  [brushingTypeKey]: ParallelSetsBrushingType

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
   * Font color
   */
  [fontColorKey]: string
}

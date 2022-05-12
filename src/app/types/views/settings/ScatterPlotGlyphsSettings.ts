/**
 * Settings for scatter plot glyphs
 */
import { SelectableDataType } from '../../data/data'

import { ViewVisualizationSettings } from './VisualizationSettings'

// keys for additional attributes
export const glyphSizeKey = `glyphSize`
export const xAttributeKey = `xAttribute`
export const yAttributeKey = `yAttribute`

/**
 * Settings for scatter plot glyphs view
 */
export interface ScatterPlotGlyphsSettings extends ViewVisualizationSettings {
  /**
   * Size of a glyph
   */
  [glyphSizeKey]: number

  /**
   * Numerical attribute for axis x
   */
  [xAttributeKey]: keyof SelectableDataType

  /**
   * Numerical attribute for axis y
   */
  [yAttributeKey]: keyof SelectableDataType
}

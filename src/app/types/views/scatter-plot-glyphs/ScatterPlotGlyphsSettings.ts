import { SelectableDataType } from '../../data/data'

import { QuantitativeVisualizationSettings } from '../QuantitativeVisualizationSettings'

export const glyphSizeKey = `glyphSize`
export const glyphSpacingKey = `glyphSpacing`

/**
 * Settings for Scatter Plot Glyphs view
 */
export interface ScatterPlotGlyphsSettings extends QuantitativeVisualizationSettings {
  /**
   * Size of a glyph
   */
  [glyphSizeKey]: number

  /**
   * Numerical attribute for axis x
   */
  xAttribute: keyof SelectableDataType

  /**
   * Numerical attribute for axis y
   */
  yAttribute: keyof SelectableDataType
}

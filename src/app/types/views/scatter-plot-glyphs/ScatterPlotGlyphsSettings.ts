import { SelectableDataType } from '../../data/data'

import { QuantitativeVisualizationSettings } from '../QuantitativeVisualizationSettings'

export const glyphSizeKey = `glyphSize`
export const glyphSpacingKey = `glyphSpacing`
export const xAttributeKey = `xAttribute`
export const yAttributeKey = `yAttribute`

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
  [xAttributeKey]: keyof SelectableDataType

  /**
   * Numerical attribute for axis y
   */
  [yAttributeKey]: keyof SelectableDataType
}

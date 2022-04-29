import { SelectableDataType } from '../../data/data'

import { QuantitativeVisualizationSettings } from '../QuantitativeVisualizationSettings'

export const glyphSizeKey = `glyphSize`
export const glyphSpacingKey = `glyphSpacing`

/**
 * Settings for Glyphs view
 */
export interface GlyphsSettings extends QuantitativeVisualizationSettings {
  /**
   * Attribute for sorting glyphs from lowest to highest value
   */
  sortAttribute: keyof SelectableDataType
  /**
   * Size of a glyph
   */
  [glyphSizeKey]: number
  /**
   * Spacing between glyphs
   */
  [glyphSpacingKey]: number
}

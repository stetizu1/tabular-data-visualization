import { SelectableDataType } from '../../data/data'

import { QuantitativeVisualizationSettings } from '../QuantitativeVisualizationSettings'

export const sortAttributeKey = `sortAttribute`
export const glyphSizeKey = `glyphSize`
export const glyphSpacingKey = `glyphSpacing`

/**
 * Settings for Glyphs view
 */
export interface GlyphsSettings extends QuantitativeVisualizationSettings {
  /**
   * Attribute for sorting glyphs from lowest to highest value
   */
  [sortAttributeKey]: keyof SelectableDataType
  /**
   * Size of a glyph
   */
  [glyphSizeKey]: number
  /**
   * Spacing between glyphs
   */
  [glyphSpacingKey]: number
}

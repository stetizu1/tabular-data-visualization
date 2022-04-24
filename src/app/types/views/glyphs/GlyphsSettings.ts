import { SelectableDataType } from '../../data/data'

import { QuantitativeVisualizationSettings } from '../QuantitativeVisualizationSettings'

/**
 * Settings for Glyphs view
 */
export interface GlyphsSettings extends QuantitativeVisualizationSettings {
  /**
   * Attribute for sorting glyphs from lowest to highest value
   */
  sortAttribute: keyof SelectableDataType
}

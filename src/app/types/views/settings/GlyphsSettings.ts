import { SelectableDataType } from '../../data/data'

import { SortType } from '../../../constants/sort/SortType'

import { ViewVisualizationSettings } from './VisualizationSettings'

export const sortAttributeKey = `sortAttribute`
export const sortTypeKey = `sortType`
export const glyphSizeKey = `glyphSize`
export const glyphSpacingKey = `glyphSpacing`

/**
 * Settings for Glyphs view
 */
export interface GlyphsSettings extends ViewVisualizationSettings {
  /**
   * Attribute for sorting glyphs from lowest to highest value
   */
  [sortAttributeKey]: keyof SelectableDataType

  /**
   * Sort type - asc/desc
   */
  [sortTypeKey]: SortType

  /**
   * Size of a glyph
   */
  [glyphSizeKey]: number

  /**
   * Spacing between glyphs
   */
  [glyphSpacingKey]: number
}

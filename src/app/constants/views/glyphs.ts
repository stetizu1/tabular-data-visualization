import { schemeCategory10 } from 'd3'

import { ColorArray } from '../../types/styling/ColorArray'
import { GlyphsSettings } from '../../types/views/settings/GlyphsSettings'

import { SortType } from '../sort/SortType'

/**
 * Minimal attribute count for glyphs
 */
export const MIN_GLYPHS_ATTRIBUTE_COUNT = 3

/**
 * Default values for glyphs settings
 */
export const GLYPHS_DEFAULT: Pick<
  GlyphsSettings,
  `glyphSize` | `glyphSpacing` | `margins` | `opacity` | `colorCategory` | `sortType`
> = {
  sortType: SortType.asc,
  glyphSize: 35,
  glyphSpacing: 3,
  margins: [15, 10, 20, 10],
  opacity: [60, 90, 30],
  colorCategory: schemeCategory10 as ColorArray,
}

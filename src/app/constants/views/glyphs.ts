import { schemeCategory10 } from 'd3'
import { GlyphsSettings } from '../../types/views/settings/GlyphsSettings'
import { ColorArray } from '../../types/styling/ColorArray'
import { SortType } from '../../helpers/data/comparator'

export const MIN_GLYPHS_ATTRIBUTE_COUNT = 3

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

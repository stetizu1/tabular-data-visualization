import { GlyphsSettings } from '../../types/views/glyphs/GlyphsSettings'

export const MIN_GLYPHS_ATTRIBUTE_COUNT = 3

export const GLYPHS_DEFAULT: Pick<GlyphsSettings, `glyphSize` | `glyphSpacing` | `margins` | `opacity`> = {
  glyphSize: 40,
  glyphSpacing: 3,
  margins: [15, 10, 20, 10],
  opacity: [60, 90, 30],
}

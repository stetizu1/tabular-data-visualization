/**
 * Text for glyphs
 */
import { ViewType } from '../../constants/views-general/ViewType'

import { VIEWS_NAMES } from '../viewsNames'
import { SETTINGS_TEXT } from './common'

/**
 * Text in glyphs
 */
export const GLYPHS_TEXT = {
  unavailable: `The glyph plot cannot be displayed with less than 3 attributes. To generate a glyph plot, select more attributes from the settings.`,
}

/**
 * Text in glyphs settings
 */
export const GLYPHS_SETTINGS_TEXT = {
  header: VIEWS_NAMES[ViewType.Glyphs],
  sorting: `Sorted by`,
  unavailable: `The glyph plot cannot be used while data have less than 3 numerical attributes. Try to use different type of visualization that fits your data.`,
  glyphSize: `Glyph size`,
  glyphSpacing: `Glyph spacing`,
  opacity: `Opacity of glyphs`,
  sort: `Sort...`,
  ...SETTINGS_TEXT,
}

import { ViewType } from '../../constants/views-general/ViewType'

import { SETTINGS_TEXT, VIEW_NAMES } from './common'

export const GLYPHS_TEXT = {
  unavailable: `The glyph plot cannot be displayed with less than 3 attributes. To generate a glyph plot, select more attributes from the settings.`,
}

export const GLYPHS_SETTINGS_TEXT = {
  header: VIEW_NAMES[ViewType.Glyphs],
  sorting: `Sorted by`,
  unavailable: `The glyph plot cannot be used while data have less than 3 numerical attributes. Try to use different type of visualization that fits your data.`,
  glyphSize: `Glyph size`,
  glyphSpacing: `Glyph spacing`,
  opacity: `Opacity of glyphs`,
  sort: `Sort...`,
  ...SETTINGS_TEXT,
}

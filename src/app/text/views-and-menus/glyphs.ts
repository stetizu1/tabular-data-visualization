import { MENU_TEXT } from './common'

export const GLYPHS_TEXT = {
  unavailable2: `The glyph plot cannot be displayed with less than 3 attributes. To generate a glyph plot, select multiple attributes from the menu.`,
}

export const GLYPHS_MENU_TEXT = {
  header: `Glyphs`,
  sorting: `Sorted by`,
  unavailable: `The glyph plot cannot be used while data has less than 3 numerical attributes. Try to use different type of visualization that fits your data.`,
  glyphSize: `Glyph size`,
  glyphSpacing: `Glyph spacing`,
  opacity: `Opacity of glyphs`,
  ...MENU_TEXT,
}

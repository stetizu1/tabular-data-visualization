import { MENU_TEXT } from './common'

export const SCATTER_PLOT_GLYPHS_TEXT = {
  unavailable: `The scatter plot with glyphs cannot be displayed with less than 3 attributes. To generate a scatter plot with glyphs, select more attributes from the menu.`,
}

export const SCATTER_PLOT_GLYPHS_MENU_TEXT = {
  header: `Scatter plot glyphs`,
  sorting: `Sorted by`,
  unavailable: `The scatter plot with glyphs cannot be used while data has less than 3 numerical attributes. Try to use different type of visualization that fits your data.`,
  glyphSize: `Glyph size`,
  opacity: `Opacity of glyphs`,
  ...MENU_TEXT,
}

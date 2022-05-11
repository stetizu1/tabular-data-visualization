import { ViewType } from '../../constants/views-general/ViewType'

import { MENU_TEXT, VIEW_NAMES } from './common'

export const SCATTER_PLOT_GLYPHS_TEXT = {
  unavailable: `The scatter plot with glyphs cannot be displayed with less than 3 attributes. To generate a scatter plot with glyphs, select more attributes from settings.`,
}

export const SCATTER_PLOT_GLYPHS_MENU_TEXT = {
  header: VIEW_NAMES[ViewType.ScatterPlotGlyphs],
  xAttribute: `X axis values`,
  yAttribute: `Y axis values`,
  unavailable: `The scatter plot with glyphs cannot be used while data has less than 3 numerical attributes. Try to use different type of visualization that fits your data.`,
  glyphSize: `Glyph size`,
  opacity: `Opacity of glyphs`,
  ...MENU_TEXT,
}

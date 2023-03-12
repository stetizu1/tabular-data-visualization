/**
 * Text for scatter plot glyphs
 */
import { ViewType } from '@/constants/views-general/ViewType'

import { VIEWS_NAMES } from '../viewsNames'
import { SETTINGS_TEXT } from './common'

/**
 * Text in scatter plot glyphs
 */
export const SCATTER_PLOT_GLYPHS_TEXT = {
  unavailable: `The scatter plot with glyphs cannot be displayed with less than 3 attributes. To generate a scatter plot with glyphs, select more attributes from the settings.`,
}

/**
 * Text in scatter plot glyphs settings
 */
export const SCATTER_PLOT_GLYPHS_SETTINGS_TEXT = {
  header: VIEWS_NAMES[ViewType.ScatterPlotGlyphs],
  xAttribute: `X axis values`,
  yAttribute: `Y axis values`,
  unavailable: `The scatter plot with glyphs cannot be used while data have less than 3 numerical attributes. Try to use different type of visualization that fits your data.`,
  glyphSize: `Glyph size`,
  opacity: `Opacity of glyphs`,
  ...SETTINGS_TEXT,
}

import { ScatterPlotGlyphsSettings } from '../../types/views/scatter-plot-glyphs/ScatterPlotGlyphsSettings'

export const MIN_GLYPHS_ATTRIBUTE_COUNT = 3

export const SCATTER_PLOT_GLYPHS_DEFAULT: Pick<ScatterPlotGlyphsSettings, `glyphSize` | `margins` | `opacity`> = {
  glyphSize: 40,
  margins: [30, 30, 30, 30],
  opacity: [60, 90, 30],
}

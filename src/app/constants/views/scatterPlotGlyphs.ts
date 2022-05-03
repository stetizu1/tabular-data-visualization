import { schemeCategory10 } from 'd3'
import { ScatterPlotGlyphsSettings } from '../../types/views/settings/ScatterPlotGlyphsSettings'
import { ColorArray } from '../../types/styling/ColorArray'

export const MIN_SCATTER_PLOT_GLYPHS_ATTRIBUTE_COUNT = 3

export const SCATTER_PLOT_GLYPHS_DEFAULT: Pick<
  ScatterPlotGlyphsSettings,
  `glyphSize` | `margins` | `opacity` | `colorCategory`
> = {
  glyphSize: 35,
  margins: [30, 30, 30, 30],
  opacity: [60, 90, 30],
  colorCategory: schemeCategory10 as ColorArray,
}

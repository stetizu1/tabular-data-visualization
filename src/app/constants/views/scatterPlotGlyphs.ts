import { schemeCategory10 } from 'd3'

import { ColorArray } from '../../types/styling/ColorArray'
import { ScatterPlotGlyphsSettings } from '../../types/views/settings/ScatterPlotGlyphsSettings'

export const MIN_SCATTER_PLOT_GLYPHS_ATTRIBUTE_COUNT = 3

export const SCATTER_PLOT_GLYPHS_DEFAULT: Pick<
  ScatterPlotGlyphsSettings,
  `glyphSize` | `margins` | `opacity` | `colorCategory`
> = {
  glyphSize: 30,
  margins: [20, 20, 20, 30],
  opacity: [60, 90, 30],
  colorCategory: schemeCategory10 as ColorArray,
}

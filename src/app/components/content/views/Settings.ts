import { ParallelCoordinatesSettings } from '../../../types/views/parallel-coordinates/ParallelCoordinatesSettings'
import { ScatterPlotMatrixSettings } from '../../../types/views/scatter-plot/ScatterPlotMatrixSettings'
import { GlyphsSettings } from '../../../types/views/glyphs/GlyphsSettings'

import { ViewType } from '../../../constants/views/ViewTypes'

export interface Settings {
  [ViewType.Glyphs]?: GlyphsSettings
  [ViewType.ScatterPlotMatrix]?: ScatterPlotMatrixSettings
  [ViewType.ParallelCoordinates]?: ParallelCoordinatesSettings
}

export type SettingsType = GlyphsSettings | ScatterPlotMatrixSettings | ParallelCoordinatesSettings

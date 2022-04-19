import { ParallelCoordinatesSettings } from '../../../types/views/parallelCoordinates/ParallelCoordinatesSettings'
import { ScatterPlotMatrixSettings } from '../../../types/views/scatterplot/ScatterPlotMatrixSettings'
import { GlyphsSettings } from '../../../types/views/glyphs/GlyphsSettings'

import { ViewType } from './ViewTypes'

export interface Settings {
  [ViewType.Glyphs]?: GlyphsSettings
  [ViewType.ScatterPlotMatrix]?: ScatterPlotMatrixSettings
  [ViewType.ParallelCoordinates]?: ParallelCoordinatesSettings
}

export type SettingsType = GlyphsSettings | ScatterPlotMatrixSettings | ParallelCoordinatesSettings

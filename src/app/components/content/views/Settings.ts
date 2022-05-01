import { ParallelCoordinatesSettings } from '../../../types/views/parallel-coordinates/ParallelCoordinatesSettings'
import { ScatterPlotMatrixSettings } from '../../../types/views/scatter-plot-matrix/ScatterPlotMatrixSettings'
import { GlyphsSettings } from '../../../types/views/glyphs/GlyphsSettings'
import { ScatterPlotGlyphsSettings } from '../../../types/views/scatter-plot-glyphs/ScatterPlotGlyphsSettings'

import { ViewType } from '../../../constants/views/ViewTypes'

export type Settings = Partial<{
  [ViewType.Glyphs]: GlyphsSettings
  [ViewType.ScatterPlotMatrix]: ScatterPlotMatrixSettings
  [ViewType.ParallelCoordinates]: ParallelCoordinatesSettings
  [ViewType.ScatterPlotGlyphs]: ScatterPlotGlyphsSettings
}>

export type SettingsType =
  | ParallelCoordinatesSettings
  | ScatterPlotMatrixSettings
  | GlyphsSettings
  | ScatterPlotGlyphsSettings

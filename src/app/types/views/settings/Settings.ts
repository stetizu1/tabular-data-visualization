import { ViewType } from '../../../constants/views/ViewTypes'

import { ParallelCoordinatesSettings } from './ParallelCoordinatesSettings'
import { ScatterPlotMatrixSettings } from './ScatterPlotMatrixSettings'
import { GlyphsSettings } from './GlyphsSettings'
import { ScatterPlotGlyphsSettings } from './ScatterPlotGlyphsSettings'
import { DataTableSettings } from './DataTableSettings'

/**
 * Settings types for all views
 */
export type Settings = Partial<{
  [ViewType.ParallelCoordinates]: ParallelCoordinatesSettings
  [ViewType.ScatterPlotMatrix]: ScatterPlotMatrixSettings
  [ViewType.Glyphs]: GlyphsSettings
  [ViewType.ScatterPlotGlyphs]: ScatterPlotGlyphsSettings
  [ViewType.DataTable]: DataTableSettings
}>

/**
 * One of the Settings types
 */
export type SettingsType =
  | ParallelCoordinatesSettings
  | ScatterPlotMatrixSettings
  | GlyphsSettings
  | ScatterPlotGlyphsSettings
  | DataTableSettings

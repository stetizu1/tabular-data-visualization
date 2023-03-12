/**
 * Combined visualization settings
 */

import { ViewType } from '@/constants/views-general/ViewType'

import { DataTableSettings } from './DataTableSettings'
import { GlyphsSettings } from './GlyphsSettings'
import { ParallelCoordinatesSettings } from './ParallelCoordinatesSettings'
import { ParallelSetsBundledSettings } from './ParallelSetsBundledSettings'
import { ScatterPlotGlyphsSettings } from './ScatterPlotGlyphsSettings'
import { ScatterPlotMatrixSettings } from './ScatterPlotMatrixSettings'

/**
 * Settings types for all views
 */
export type Settings = Partial<{
  [ViewType.ParallelCoordinates]: ParallelCoordinatesSettings
  [ViewType.ScatterPlotMatrix]: ScatterPlotMatrixSettings
  [ViewType.Glyphs]: GlyphsSettings
  [ViewType.ScatterPlotGlyphs]: ScatterPlotGlyphsSettings
  [ViewType.ParallelSetsBundled]: ParallelSetsBundledSettings
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
  | ParallelSetsBundledSettings

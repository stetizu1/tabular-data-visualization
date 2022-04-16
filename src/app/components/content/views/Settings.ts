import { QuantitativeVisualizationSettings } from '../../../types/view/QuantitativeVisualization'
import { GlyphsSettings } from './glyphs/GlyphsSettings'
import { ViewType } from './ViewTypes'

export interface Settings {
  [ViewType.Glyphs]?: GlyphsSettings
  [ViewType.ScatterPlotMatrix]?: QuantitativeVisualizationSettings
  [ViewType.ParallelCoordinates]?: QuantitativeVisualizationSettings
}

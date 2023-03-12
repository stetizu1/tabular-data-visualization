import { ViewType } from '@/constants/views-general/ViewType'

/**
 * Names of the views
 */
export const VIEWS_NAMES: Record<ViewType, string> = {
  [ViewType.ParallelCoordinates]: `Parallel Coordinates`,
  [ViewType.ScatterPlotMatrix]: `Scatter Plot Matrix`,
  [ViewType.Glyphs]: `Glyphs`,
  [ViewType.ScatterPlotGlyphs]: `Scatter Plot Glyphs`,
  [ViewType.ParallelSetsBundled]: `Parallel Sets (bundled layout)`,
  [ViewType.DataTable]: `Data Table`,
}

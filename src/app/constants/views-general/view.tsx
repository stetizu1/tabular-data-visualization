import { Brushable } from '@/types/brushing/Brushable'
import { DataTableSettings } from '@/types/views/settings/DataTableSettings'
import { GlyphsSettings } from '@/types/views/settings/GlyphsSettings'
import { ParallelCoordinatesSettings } from '@/types/views/settings/ParallelCoordinatesSettings'
import { ParallelSetsBundledSettings } from '@/types/views/settings/ParallelSetsBundledSettings'
import { ScatterPlotGlyphsSettings } from '@/types/views/settings/ScatterPlotGlyphsSettings'
import { ScatterPlotMatrixSettings } from '@/types/views/settings/ScatterPlotMatrixSettings'
import { SettingsType } from '@/types/views/settings/Settings'
import { VisualizationView } from '@/types/views/VisualizationView'

import { DataTable } from '@/components/content/views/data-table/DataTable'
import { Glyphs } from '@/components/content/views/glyphs/Glyphs'
import { ParallelCoordinates } from '@/components/content/views/parallel-coordinates/ParallelCoordinates'
import { ParallelSetsBundled } from '@/components/content/views/parallel-sets-bundeled/ParallelSetsBundled'
import { ScatterPlotGlyphs } from '@/components/content/views/scatter-plot-glyphs/ScatterPlotGlyphs'
import { ScatterPlotMatrix } from '@/components/content/views/scatter-plot-matrix/ScatterPlotMatrix'

import { ViewType } from './ViewType'

/**
 * Size of a view border
 */
export const VIEW_BORDER_SIZE = 5

type ViewElementFunction = (
  props: Brushable & VisualizationView,
  settings: SettingsType,
  showFilter?: boolean,
) => JSX.Element

/**
 * Record of view types and their creation functions.
 * Functions take general props and settings (and filters in case of data table) and returns the view.
 */
export const getViewRecord: Record<ViewType, ViewElementFunction> = {
  [ViewType.Glyphs]: (p, s) => <Glyphs {...p} {...(s as GlyphsSettings)} />,
  [ViewType.ParallelCoordinates]: (p, s) => <ParallelCoordinates {...p} {...(s as ParallelCoordinatesSettings)} />,
  [ViewType.ScatterPlotMatrix]: (p, s) => <ScatterPlotMatrix {...p} {...(s as ScatterPlotMatrixSettings)} />,
  [ViewType.ScatterPlotGlyphs]: (p, s) => <ScatterPlotGlyphs {...p} {...(s as ScatterPlotGlyphsSettings)} />,
  [ViewType.ParallelSetsBundled]: (p, s) => <ParallelSetsBundled {...p} {...(s as ParallelSetsBundledSettings)} />,
  [ViewType.DataTable]: (p, s, f) => <DataTable {...p} {...(s as DataTableSettings)} showFilter={!!f} />,
}

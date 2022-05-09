import { VisualizationView } from '../../types/views/VisualizationView'
import { Brushable } from '../../types/brushing/Brushable'
import { SettingsType } from '../../types/views/settings/Settings'
import { ParallelCoordinatesSettings } from '../../types/views/settings/ParallelCoordinatesSettings'
import { ScatterPlotMatrixSettings } from '../../types/views/settings/ScatterPlotMatrixSettings'
import { GlyphsSettings } from '../../types/views/settings/GlyphsSettings'
import { ScatterPlotGlyphsSettings } from '../../types/views/settings/ScatterPlotGlyphsSettings'
import { DataTableSettings } from '../../types/views/settings/DataTableSettings'
import { ParallelSetsBundledSettings } from '../../types/views/settings/ParallelSetsBundledSettings'

import { ParallelCoordinates } from '../../components/content/views/parallel-coordinates/ParallelCoordinates'
import { ScatterPlotMatrix } from '../../components/content/views/scatter-plot-matrix/ScatterPlotMatrix'
import { Glyphs } from '../../components/content/views/glyphs/Glyphs'
import { ScatterPlotGlyphs } from '../../components/content/views/scatter-plot-glyphs/ScatterPlotGlyphs'
import { DataTable } from '../../components/content/views/data-table/DataTable'
import { ParallelSetsBundled } from '../../components/content/views/parallel-sets-bundeled/ParallelSetsBundled'

import { ViewType } from './ViewType'

type ViewElementFunction = (
  props: Brushable & VisualizationView,
  settings: SettingsType,
  showFilter?: boolean,
) => JSX.Element

export const getViewRecord: Record<ViewType, ViewElementFunction> = {
  [ViewType.Glyphs]: (p, s) => <Glyphs {...p} {...(s as GlyphsSettings)} />,
  [ViewType.ParallelCoordinates]: (p, s) => <ParallelCoordinates {...p} {...(s as ParallelCoordinatesSettings)} />,
  [ViewType.ScatterPlotMatrix]: (p, s) => <ScatterPlotMatrix {...p} {...(s as ScatterPlotMatrixSettings)} />,
  [ViewType.ScatterPlotGlyphs]: (p, s) => <ScatterPlotGlyphs {...p} {...(s as ScatterPlotGlyphsSettings)} />,
  [ViewType.DataTable]: (p, s, f) => <DataTable {...p} {...(s as DataTableSettings)} showFilter={!!f} />,
  [ViewType.ParallelSetsBundled]: (p, s) => <ParallelSetsBundled {...p} {...(s as ParallelSetsBundledSettings)} />,
}

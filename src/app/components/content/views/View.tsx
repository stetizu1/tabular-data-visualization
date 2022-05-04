import { VoidFunctionComponent } from 'react'
import { Box } from '@mui/material'

import { VisualizationView } from '../../../types/views/VisualizationView'
import { Brushable } from '../../../types/brushing/Brushable'
import { ParallelCoordinatesSettings } from '../../../types/views/settings/ParallelCoordinatesSettings'
import { ScatterPlotMatrixSettings } from '../../../types/views/settings/ScatterPlotMatrixSettings'
import { GlyphsSettings } from '../../../types/views/settings/GlyphsSettings'
import { ScatterPlotGlyphsSettings } from '../../../types/views/settings/ScatterPlotGlyphsSettings'
import { DataTableSettings } from '../../../types/views/settings/DataTableSettings'

import { ViewType } from '../../../constants/views/ViewTypes'
import { VIEW_BORDER_SIZE } from '../../../constants/views/common'

import { getViewBoxStyle } from '../../../components-style/content/views/viewStyle'

import { Settings, SettingsType } from '../../../types/views/settings/Settings'
import { ParallelCoordinates } from './parallel-coordinates/ParallelCoordinates'
import { ScatterPlotMatrix } from './scatter-plot-matrix/ScatterPlotMatrix'
import { Glyphs } from './glyphs/Glyphs'
import { ScatterPlotGlyphs } from './scatter-plot-glyphs/ScatterPlotGlyphs'
import { DataTable } from './data-table/DataTable'

export interface ViewProps extends Brushable, VisualizationView {
  component: ViewType
  settings: Settings
}

type ViewElementFunction = (props: Brushable & VisualizationView, settings: SettingsType) => JSX.Element

const options: Record<ViewType, ViewElementFunction> = {
  [ViewType.Glyphs]: (p, s) => <Glyphs {...p} {...(s as GlyphsSettings)} />,
  [ViewType.ParallelCoordinates]: (p, s) => <ParallelCoordinates {...p} {...(s as ParallelCoordinatesSettings)} />,
  [ViewType.ScatterPlotMatrix]: (p, s) => <ScatterPlotMatrix {...p} {...(s as ScatterPlotMatrixSettings)} />,
  [ViewType.ScatterPlotGlyphs]: (p, s) => <ScatterPlotGlyphs {...p} {...(s as ScatterPlotGlyphsSettings)} />,
  [ViewType.DataTable]: (p, s) => <DataTable {...p} {...(s as DataTableSettings)} />,
}

export const View: VoidFunctionComponent<ViewProps> = ({ width, height, component, settings, ...dataProps }) => {
  const graph = options[component]
  const settingsCurr = settings[component]
  if (!settingsCurr) return null
  return (
    <Box sx={getViewBoxStyle(width, height)}>
      {graph({ width, height: height - VIEW_BORDER_SIZE, ...dataProps }, settingsCurr)}
    </Box>
  )
}

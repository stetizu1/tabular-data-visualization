import { VoidFunctionComponent } from 'react'

import { VisualizationView } from '../../../types/views/VisualizationView'
import { Brushable } from '../../../types/brushing/Brushable'
import { ParallelCoordinatesSettings } from '../../../types/views/parallel-coordinates/ParallelCoordinatesSettings'
import { ScatterPlotMatrixSettings } from '../../../types/views/scatter-plot-matrix/ScatterPlotMatrixSettings'
import { GlyphsSettings } from '../../../types/views/glyphs/GlyphsSettings'
import { ScatterPlotGlyphsSettings } from '../../../types/views/scatter-plot-glyphs/ScatterPlotGlyphsSettings'

import { ViewType } from '../../../constants/views/ViewTypes'
import { VIEW_BORDER_SIZE } from '../../../constants/views/common'

import { useViewStyle } from '../../../components-style/content/views/useViewStyle'

import { Settings, SettingsType } from './Settings'
import { ParallelCoordinates } from './parallel-coordinates/ParallelCoordinates'
import { ScatterPlotMatrix } from './scatter-plot-matrix/ScatterPlotMatrix'
import { Glyphs } from './glyphs/Glyphs'
import { ScatterPlotGlyphs } from './scatter-plot-glyphs/ScatterPlotGlyphs'

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
}

export const View: VoidFunctionComponent<ViewProps> = ({ width, height, component, settings, ...dataProps }) => {
  const graph = options[component]
  const classes = useViewStyle({ width, height })
  const settingsCurr = settings[component]
  if (!settingsCurr) return null
  return (
    <div className={classes.box}>{graph({ width, height: height - VIEW_BORDER_SIZE, ...dataProps }, settingsCurr)}</div>
  )
}

import { FunctionComponent } from 'react'

import { VisualizationView } from '../../../types/views/VisualizationView'
import { SelectableDataType } from '../../../types/data/data'
import { Brushable } from '../../../types/brushing/Brushable'
import { ParallelCoordinatesSettings } from '../../../types/views/parallelCoordinates/ParallelCoordinatesSettings'
import { ScatterPlotMatrixSettings } from '../../../types/views/scatterplot/ScatterPlotMatrixSettings'
import { GlyphsSettings } from '../../../types/views/glyphs/GlyphsSettings'

import { ViewType } from './ViewTypes'
import { Settings, SettingsType } from './Settings'
import { ParallelCoordinates } from './parallelCoordinates/ParallelCoordinates'
import { ScatterPlotMatrix } from './scatterplot/ScatterPlotMatrix'
import { Glyphs } from './glyphs/Glyphs'
import { useViewStyle } from './useViewStyle'

interface ViewProps extends Brushable, VisualizationView {
  component: ViewType
  settings: Settings
  defaultDisplayAttributes: Array<keyof SelectableDataType>
}

type ViewElementFunction = (props: Brushable & VisualizationView, settings: SettingsType) => JSX.Element

const options: Record<ViewType, ViewElementFunction> = {
  [ViewType.Glyphs]: (p, s) => <Glyphs {...p} {...(s as GlyphsSettings)} />,
  [ViewType.ParallelCoordinates]: (p, s) => <ParallelCoordinates {...p} {...(s as ParallelCoordinatesSettings)} />,
  [ViewType.ScatterPlotMatrix]: (p, s) => <ScatterPlotMatrix {...p} {...(s as ScatterPlotMatrixSettings)} />,
}

export const View: FunctionComponent<ViewProps> = ({
  width,
  height,
  component,
  settings,
  defaultDisplayAttributes,
  ...dataProps
}) => {
  const graph = options[component]
  const classes = useViewStyle({ width, height })
  const settingsCurr = settings[component] || {
    displayAttributes: defaultDisplayAttributes,
  }
  return <div className={classes.box}>{graph({ width, height, ...dataProps }, settingsCurr)}</div>
}

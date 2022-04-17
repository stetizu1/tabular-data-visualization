import React, { FunctionComponent } from 'react'
import { SelectableDataType } from '../../../types/data/data'
import { Brushable } from '../../../types/brushing/Brushable'
import { ViewType } from './ViewTypes'
import { ParallelCoordinates } from './parallelCoordinates/ParallelCoordinates'
import { ScatterPlotMatrix } from './scatterplot/ScatterPlotMatrix'
import { Glyphs } from './glyphs/Glyphs'
import { useViewStyle } from './useViewStyle'
import { Settings, SettingsType } from './Settings'
import { GlyphsSettings } from '../../../types/views/glyphs/GlyphsSettings'
import { ParallelCoordinatesSettings } from '../../../types/views/parallelCoordinates/ParallelCoordinatesSettings'
import { ScatterPlotMatrixSettings } from '../../../types/views/scatterplot/ScatterPlotMatrixSettings'

interface ViewDataProps extends Brushable {
  dataset: SelectableDataType[]
  width: number
  height: number
}

interface ViewProps extends ViewDataProps {
  component: ViewType
  settings: Settings
  defaultDisplayAttributes: Array<keyof SelectableDataType>
}

type ViewElementFunction = (props: ViewDataProps, settings: SettingsType) => JSX.Element

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

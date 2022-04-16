import React, { FunctionComponent } from 'react'
import { SelectableDataType } from '../../../types/data/data'
import { Brushable } from '../../../types/brushing/Brushable'
import { QuantitativeVisualizationSettings } from '../../../types/view/QuantitativeVisualization'
import { ViewType } from './ViewTypes'
import { ParallelCoordinates } from './parallelCoordinates/ParallelCoordinates'
import { ScatterPlotMatrix } from './scatterplot/ScatterPlotMatrix'
import { Glyphs } from './glyphs/Glyphs'
import { useViewStyle } from './useViewStyle'
import { Settings } from './Settings'
import { GlyphsSettings } from './glyphs/GlyphsSettings'

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

type ViewElementFunction = (
  props: ViewDataProps,
  settings: GlyphsSettings | QuantitativeVisualizationSettings,
) => JSX.Element
const options: Record<ViewType, ViewElementFunction> = {
  [ViewType.Glyphs]: (props, settings) => <Glyphs {...props} {...settings} />,
  [ViewType.ParallelCoordinates]: (props, settings) => <ParallelCoordinates {...props} {...settings} />,
  [ViewType.ScatterPlotMatrix]: (props, settings) => <ScatterPlotMatrix {...props} {...settings} />,
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

import React, { FunctionComponent } from 'react'
import { SelectableDataType } from '../../../types/data/data'
import { Brushable } from '../../../types/brushing/Brushable'
import { ViewType } from './ViewTypes'
import { ParallelCoordinates } from './parallelCoordinates/ParallelCoordinates'
import { ScatterPlotMatrix } from './scatterplot/ScatterPlotMatrix'
import { Glyphs } from './glyphs/Glyphs'
import { useViewStyle } from './useViewStyle'

interface ViewDataProps extends Brushable {
  dataset: SelectableDataType[]
  catAttribute: keyof SelectableDataType
  width: number
  height: number
}

interface ViewProps extends ViewDataProps{
  component: ViewType
}

type ViewElementFunction = (data: ViewDataProps) => JSX.Element
const Options: Record<ViewType, ViewElementFunction> = {
  [ViewType.Glyphs]: (props) => <Glyphs {...props} />,
  [ViewType.ParallelCoordinates]: (props) => <ParallelCoordinates {...props} />,
  [ViewType.ScatterPlotMatrix]: (props) => <ScatterPlotMatrix {...props} />,
}

export const View: FunctionComponent<ViewProps> = ({ width, height, component, ...dataProps }) => {
  const graph = Options[component]
  const classes = useViewStyle({ width, height })
  return <div className={classes.box}>
    {graph({ width, height, ...dataProps })}
  </div>
}

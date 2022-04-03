import React, { FunctionComponent } from 'react'
import { Brushable } from '../../../types/brushing/Brushable'
import { SelectableDataType } from '../../../types/data/data'
import { EmptySite } from '../empty/EmptySite'
import { View } from './View'
import { ViewType } from './ViewTypes'
import { useViewGridStyle } from './useViewGridStyle'

interface ViewGridProps extends Brushable {
  dataset: SelectableDataType[] | null
  catAttribute: keyof SelectableDataType
}


export const ViewGrid: FunctionComponent<ViewGridProps> = ({ dataset, ...viewProps }) => {
  const classes = useViewGridStyle()
  return !dataset ? <EmptySite /> : <>
    <div className={classes.column}>
      <View width={960} height={400} dataset={dataset} component={ViewType.ParallelCoordinates} {...viewProps} />
      <View width={960} height={960} dataset={dataset} component={ViewType.ScatterPlotMatrix} {...viewProps} />
      <View width={960} height={960} dataset={dataset} component={ViewType.Glyphs} {...viewProps} />
    </div>
  </>
}

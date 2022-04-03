import React, { FunctionComponent } from 'react'
import { Brushable } from '../../../types/brushing/Brushable'
import { SelectableDataType } from '../../../types/data/data'
import { SideEffectVoid } from '../../../types/basic/functionTypes'
import { getDefaultQuantitativeAttributes } from '../../../helpers/data/data'
import { DataDrawer } from '../dataDrawer/DataDrawer'
import { EmptySite } from '../empty/EmptySite'
import { View } from './View'
import { ViewType } from './ViewTypes'
import { useViewGridStyle } from './useViewGridStyle'

interface ViewGridDataProps extends Brushable {
  dataset: SelectableDataType[] | null
  categoryAttribute: keyof SelectableDataType
}

interface ViewGridProps extends ViewGridDataProps {
  isDrawerOpen: boolean
  closeDrawer: SideEffectVoid
}

export const ViewGrid: FunctionComponent<ViewGridProps> = ({ dataset, isDrawerOpen, closeDrawer, ...viewProps }) => {
  const classes = useViewGridStyle()
  const getContent = () => {
    if (!dataset) return <EmptySite />

    const displayAttributes = getDefaultQuantitativeAttributes(dataset)
    const allViewProps = { ...viewProps, dataset, displayAttributes }
    return <div className={classes.column}>
      <View width={960} height={400} component={ViewType.ParallelCoordinates} {...allViewProps} />
      <View width={960} height={960} component={ViewType.ScatterPlotMatrix} {...allViewProps} />
      <View width={960} height={520} component={ViewType.Glyphs} {...allViewProps} />
    </div>
  }
  return <>
    <DataDrawer isOpen={isDrawerOpen} close={closeDrawer} />
    {getContent()}
  </>
}

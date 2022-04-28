import { FunctionComponent, useState } from 'react'
import { schemeCategory10 } from 'd3'

import { Brushable } from '../../../types/brushing/Brushable'
import { SelectableDataType } from '../../../types/data/data'
import { SideEffectVoid } from '../../../types/basic/functionTypes'
import { DataLoadState } from '../../../constants/data/dataLoadState'

import { getDefaultQuantitativeAttributesKeys } from '../../../helpers/data/data'

import { ViewType } from '../../../constants/views/ViewTypes'

import { useViewGridStyle } from '../../../components-style/content/views/useViewGridStyle'

import { DataDrawer } from '../data-drawer/DataDrawer'
import { EmptyData } from '../no-data/EmptyData'
import { Loading } from '../no-data/Loading'

import { View } from './View'
import { Settings } from './Settings'

export interface ViewGridDataProps extends Brushable {
  dataset: ReadonlyArray<SelectableDataType> | null
}

export interface ViewGridProps extends ViewGridDataProps {
  dataLoadState: DataLoadState
  isDrawerOpen: boolean
  isDetailsVisible: boolean
  closeDrawer: SideEffectVoid
  cleanSelectedIfViewWasBrushing: (viewType: ViewType) => void
}

export const ViewGrid: FunctionComponent<ViewGridProps> = ({
  dataset,
  dataLoadState,
  isDrawerOpen,
  closeDrawer,
  cleanSelectedIfViewWasBrushing,
  ...viewProps
}) => {
  const classes = useViewGridStyle()
  const [settings, setSettings] = useState<Settings>({})
  const [defaultDisplayAttributes, setDefaultDisplayAttributes] = useState<Array<keyof SelectableDataType> | null>(null)

  // reset if dataset is removed
  if (!dataset && defaultDisplayAttributes) {
    setSettings({})
    setDefaultDisplayAttributes(null)
  }
  if (dataset && !defaultDisplayAttributes) {
    setDefaultDisplayAttributes(getDefaultQuantitativeAttributesKeys(dataset))
  }

  const getContent = (
    dataset: ReadonlyArray<SelectableDataType>,
    defaultDisplayAttributes: Array<keyof SelectableDataType>,
  ) => {
    const defaultColors = schemeCategory10
    const allViewProps = {
      ...viewProps,
      settings,
      dataset,
      defaultDisplayAttributes,
      defaultColors,
    }
    const views = [ViewType.ParallelCoordinates, ViewType.ScatterPlotMatrix, ViewType.Glyphs]
    return (
      <>
        <DataDrawer
          isOpen={isDrawerOpen}
          close={closeDrawer}
          dataset={dataset}
          views={views}
          settings={settings}
          setSettings={setSettings}
          cleanSelectedIfViewWasBrushing={cleanSelectedIfViewWasBrushing}
        />
        <div className={classes.column}>
          <View width={960} height={400} component={ViewType.ParallelCoordinates} {...allViewProps} />
          <View width={960} height={960} component={ViewType.ScatterPlotMatrix} {...allViewProps} />
          <View width={960} height={620} component={ViewType.Glyphs} {...allViewProps} />
        </div>
      </>
    )
  }
  if (dataLoadState === DataLoadState.NoData) {
    return <EmptyData />
  }
  if (dataLoadState === DataLoadState.Loading || (dataset && !defaultDisplayAttributes)) {
    return <Loading />
  }
  return getContent(dataset!, defaultDisplayAttributes!)
}

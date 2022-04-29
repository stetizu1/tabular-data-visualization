import { Dispatch, FunctionComponent, SetStateAction } from 'react'

import { Brushable } from '../../../types/brushing/Brushable'
import { SelectableDataType } from '../../../types/data/data'
import { SideEffectVoid } from '../../../types/basic/functionTypes'
import { DataLoadState } from '../../../constants/data/dataLoadState'

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
  settings: Settings
  setSettings: Dispatch<SetStateAction<Settings>>
}

export const ViewGrid: FunctionComponent<ViewGridProps> = ({
  dataset,
  dataLoadState,
  isDrawerOpen,
  closeDrawer,
  cleanSelectedIfViewWasBrushing,
  settings,
  setSettings,
  ...viewProps
}) => {
  const classes = useViewGridStyle()

  const getContent = (dataset: ReadonlyArray<SelectableDataType>) => {
    const allViewProps = {
      ...viewProps,
      dataset,
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
        {settings !== null && (
          <div className={classes.column}>
            <View
              width={960}
              height={400}
              component={ViewType.ParallelCoordinates}
              settings={settings}
              {...allViewProps}
            />
            <View
              width={960}
              height={960}
              component={ViewType.ScatterPlotMatrix}
              settings={settings}
              {...allViewProps}
            />
            <View width={960} height={620} component={ViewType.Glyphs} settings={settings} {...allViewProps} />
          </div>
        )}
      </>
    )
  }
  if (dataLoadState === DataLoadState.NoData) {
    return <EmptyData />
  }
  if (dataLoadState === DataLoadState.Loading) {
    return <Loading />
  }
  return getContent(dataset!)
}

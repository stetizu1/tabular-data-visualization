import { Dispatch, FunctionComponent, SetStateAction } from 'react'

import { Brushable } from '../../../types/brushing/Brushable'
import { SelectableDataType } from '../../../types/data/data'
import { SideEffectVoid } from '../../../types/basic/functionTypes'
import { Dimensions } from '../../../types/basic/dimensions'

import { ViewType } from '../../../constants/views/ViewTypes'

import { useViewGridStyle } from '../../../components-style/content/views/useViewGridStyle'

import { DataDrawer } from '../data-drawer/DataDrawer'

import { View } from './View'
import { Settings } from './Settings'

export interface ViewGridDataProps extends Brushable {
  dataset: ReadonlyArray<SelectableDataType>
}

export interface ViewGridProps extends ViewGridDataProps {
  isDrawerOpen: boolean
  isDetailsVisible: boolean
  closeDrawer: SideEffectVoid
  cleanSelectedIfViewWasBrushing: (viewType: ViewType) => void
  settings: Settings
  setSettings: Dispatch<SetStateAction<Settings>>
}

export const ViewGrid: FunctionComponent<ViewGridProps> = ({
  isDrawerOpen,
  closeDrawer,
  cleanSelectedIfViewWasBrushing,
  settings,
  setSettings,
  ...viewProps
}) => {
  const classes = useViewGridStyle()
  const views = [ViewType.ParallelCoordinates, ViewType.ScatterPlotMatrix, ViewType.Glyphs]
  const dimensions: Dimensions[] = [
    { width: 960, height: 400 },
    { width: 960, height: 960 },
    { width: 960, height: 620 },
  ]
  return (
    <>
      <DataDrawer
        isOpen={isDrawerOpen}
        close={closeDrawer}
        dataset={viewProps.dataset}
        views={views}
        settings={settings}
        setSettings={setSettings}
        cleanSelectedIfViewWasBrushing={cleanSelectedIfViewWasBrushing}
      />
      {settings !== null && (
        <div className={classes.column}>
          {views.map((view, idx) => (
            <View
              width={dimensions[idx].width}
              height={dimensions[idx].height}
              component={view}
              settings={settings}
              key={idx}
              {...viewProps}
            />
          ))}
        </div>
      )}
    </>
  )
}

import { FunctionComponent, useState } from 'react'
import { schemeCategory10 } from 'd3'

import { Brushable } from '../../../types/brushing/Brushable'
import { SelectableDataType } from '../../../types/data/data'
import { SideEffectVoid } from '../../../types/basic/functionTypes'

import { getDefaultQuantitativeAttributesKeys } from '../../../helpers/data/data'

import { DataDrawer } from '../dataDrawer/DataDrawer'
import { EmptySite } from '../empty/EmptySite'

import { View } from './View'
import { ViewType } from './ViewTypes'
import { Settings } from './Settings'
import { useViewGridStyle } from './useViewGridStyle'

export interface ViewGridDataProps extends Brushable {
  dataset: ReadonlyArray<SelectableDataType> | null
}

export interface ViewGridProps extends ViewGridDataProps {
  isDrawerOpen: boolean
  closeDrawer: SideEffectVoid
  cleanSelectedIfViewWasBrushing: (viewType: ViewType) => void
}

export const ViewGrid: FunctionComponent<ViewGridProps> = ({
  dataset,
  isDrawerOpen,
  closeDrawer,
  cleanSelectedIfViewWasBrushing,
  ...viewProps
}) => {
  const classes = useViewGridStyle()
  const [settings, setSettings] = useState<Settings>({})
  const [defaultDisplayAttributes, setDefaultDisplayAttributes] = useState<Array<keyof SelectableDataType> | null>(null)

  const getContent = () => {
    if (!dataset) {
      if (defaultDisplayAttributes) {
        setSettings({})
        setDefaultDisplayAttributes(null)
      }
      return <EmptySite />
    }
    if (!defaultDisplayAttributes) {
      setDefaultDisplayAttributes(getDefaultQuantitativeAttributesKeys(dataset))
      return null
    }
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
  return <>{getContent()}</>
}

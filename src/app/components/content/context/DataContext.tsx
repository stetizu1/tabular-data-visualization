import { FunctionComponent, useState } from 'react'

import { SelectableDataType } from '../../../types/data/data'
import { SideEffectVoid } from '../../../types/basic/functionTypes'
import { SetComponentBrushing } from '../../../types/brushing/Brushable'

import { useUpdatedRef } from '../../../helpers/react/useUpdatedRef'

import { DataLoadState } from '../../../constants/data/dataLoadState'
import { ViewType } from '../../../constants/views/ViewTypes'

import { TopToolbar } from '../top-toolbar/TopToolbar'
import { ViewGrid } from '../views/ViewGrid'

export const DataContext: FunctionComponent = () => {
  const [dataset, setDataset] = useState<ReadonlyArray<SelectableDataType> | null>(null)
  const [componentBrushing, setCurrentComponentBrushing] = useState<null | ViewType>(null)
  const [cleanBrushing, setCleanBrushing] = useState<SideEffectVoid[]>([])
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false)
  const [redrawTime, setRedrawTime] = useState(Date.now())
  const [dataLoadState, setDataLoadState] = useState(DataLoadState.NoData)

  const cleanBrushingRef = useUpdatedRef(cleanBrushing)
  const componentBrushingRef = useUpdatedRef(componentBrushing)

  const setDatasetAndRemoveBrushing = (data: ReadonlyArray<SelectableDataType> | null) => {
    setDataset(data)
    setCurrentComponentBrushing(null)
  }

  const setDataSelected = (setFunction: (data: SelectableDataType) => boolean): void => {
    if (dataset) {
      dataset.forEach((data) => {
        data.selected = setFunction(data)
      })
      setRedrawTime(Date.now()) // redraw component
    }
  }

  const cleanAllBrushes = () => {
    setDataSelected((data) => (data.selected = false))
    cleanBrushingRef.current.forEach((f) => f())
  }

  const clearBrushesOnButton = () => {
    setCurrentComponentBrushing(null)
    cleanAllBrushes()
  }

  const setComponentBrushing: SetComponentBrushing = (newComponent) => {
    if (componentBrushingRef.current !== newComponent) cleanAllBrushes()
    setCurrentComponentBrushing(newComponent)
  }

  const registerCleanBrushing = (cleanBrushing: SideEffectVoid) => {
    setCleanBrushing((prev) => [...prev, cleanBrushing])
  }

  const cleanSelectedIfViewWasBrushing = (component: ViewType) => {
    if (componentBrushingRef.current === component) cleanAllBrushes()
    setCurrentComponentBrushing(null)
  }

  const isBrushingActive = componentBrushingRef.current !== null

  const viewProps = {
    dataset,
    registerCleanBrushing,
    setComponentBrushing,
    setDataSelected,
    redrawTime,
    isBrushingActive,
  }

  return (
    <>
      <TopToolbar
        clearBrushes={clearBrushesOnButton}
        setDataset={setDatasetAndRemoveBrushing}
        brushingActive={isBrushingActive}
        openDrawerDisabled={dataset === null}
        openDrawer={() => setDrawerOpen(true)}
        setDataLoadState={setDataLoadState}
      />
      <ViewGrid
        dataLoadState={dataLoadState}
        isDrawerOpen={isDrawerOpen}
        closeDrawer={() => setDrawerOpen(false)}
        cleanSelectedIfViewWasBrushing={cleanSelectedIfViewWasBrushing}
        {...viewProps}
      />
    </>
  )
}

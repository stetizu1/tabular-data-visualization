import { FunctionComponent, useState } from 'react'

import { SelectableDataType } from '../../../types/data/data'
import { SideEffectVoid } from '../../../types/basic/functionTypes'

import { useUpdatedRef } from '../../../helpers/react/useUpdatedRef'

import { TopToolbar } from '../topToolbar/TopToolbar'
import { ViewGrid } from '../views/ViewGrid'

export const DataContext: FunctionComponent = () => {
  const [dataset, setDataset] = useState<ReadonlyArray<SelectableDataType> | null>(null)
  const [componentBrushing, setCurrentComponentBrushing] = useState<null | SVGGElement>(null)
  const [cleanBrushing, setCleanBrushing] = useState<SideEffectVoid[]>([])
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false)
  const [redrawTime, setRedrawTime] = useState(Date.now())

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

  const cleanAllBrushes = () => cleanBrushingRef.current.forEach((f) => f())

  const clearBrushesOnButton = () => {
    setCurrentComponentBrushing(null)
    cleanAllBrushes()
  }

  const setComponentBrushing = (newComponent: SVGGElement | null): void => {
    if (componentBrushingRef.current !== newComponent) cleanAllBrushes()
    setCurrentComponentBrushing(newComponent)
  }

  const registerCleanBrushing = (cleanBrushing: SideEffectVoid) => {
    setCleanBrushing((prev) => [...prev, cleanBrushing])
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
        setData={setDatasetAndRemoveBrushing}
        brushingActive={isBrushingActive}
        openDrawer={() => setDrawerOpen(true)}
      />
      <ViewGrid isDrawerOpen={isDrawerOpen} closeDrawer={() => setDrawerOpen(false)} {...viewProps} />
    </>
  )
}

import { FunctionComponent, useState } from 'react'

import { SelectableDataType } from '../../../types/data/data'
import { SideEffectVoid } from '../../../types/basic/functionTypes'

import { useUpdatedRef } from '../../../helpers/react/useUpdatedRef'

import { TopToolbar } from '../topToolbar/TopToolbar'
import { ViewGrid } from '../views/ViewGrid'

export const DataContext: FunctionComponent = () => {
  const [dataset, setDataset] = useState<SelectableDataType[] | null>(null)
  const [componentBrushing, setComponentBrushing] = useState<null | SVGGElement>(null)
  const [cleanBrushing, setCleanBrushing] = useState<SideEffectVoid[]>([])
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false)
  const [redrawTime, setRedrawTime] = useState(Date.now())

  const cleanBrushingRef = useUpdatedRef(cleanBrushing)
  const componentBrushingRef = useUpdatedRef(componentBrushing)

  const setDatasetAndRemoveBrushing = (data: SelectableDataType[] | null) => {
    setDataset(data)
    setComponentBrushing(null)
  }

  const redraw = () => {
    setRedrawTime(Date.now())
  }

  const cleanAllBrushes = () => cleanBrushingRef.current.forEach((f) => f())

  const clearBrushesOnButton = () => {
    setComponentBrushing(null)
    cleanAllBrushes()
  }

  const setComponentBrushingAndClean = (newComponent: SVGGElement | null): void => {
    if (componentBrushingRef.current !== newComponent) cleanAllBrushes()
    setComponentBrushing(newComponent)
  }

  const registerCleanBrushing = (cleanBrushing: SideEffectVoid) => {
    setCleanBrushing((prev) => [...prev, cleanBrushing])
  }

  const isBrushingActive = componentBrushingRef.current !== null

  const viewProps = {
    dataset,
    registerCleanBrushing,
    setComponentBrushing: setComponentBrushingAndClean,
    redraw,
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

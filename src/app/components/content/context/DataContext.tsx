import { FunctionComponent, useState } from 'react'

import { SelectableDataType } from '../../../types/data/data'
import { SideEffectVoid } from '../../../types/basic/functionTypes'

import { useUpdatedRef } from '../../../helpers/react/useUpdatedRef'

import { TopToolbar } from '../topToolbar/TopToolbar'
import { ViewGrid } from '../views/ViewGrid'

export const DataContext: FunctionComponent = () => {
  const [dataset, setDataset] = useState<SelectableDataType[] | null>(null)
  const [componentBrushing, setComponentBrushing] = useState<null | SVGGElement>(null)
  const [cleanBrushes, setCleanBrushes] = useState<SideEffectVoid[]>([])
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false)

  const cleanBrushesRef = useUpdatedRef(cleanBrushes)
  const componentBrushingRef = useUpdatedRef(componentBrushing)

  const setDatasetAndRemoveBrushing = (data: SelectableDataType[] | null) => {
    setDataset(data)
    setComponentBrushing(null)
  }

  const setSelected = (selected: boolean[]) => {
    setDataset((prev) => (prev ? prev.map((data, idx) => ({ ...data, selected: selected[idx] })) : null))
  }

  const cleanAllBrushes = () => cleanBrushesRef.current.forEach((f) => f())
  const clearBrushesOnButton = () => {
    setComponentBrushing(null)
    cleanAllBrushes()
  }

  const setComponentBrushingAndClean = (newComponent: SVGGElement | null): void => {
    if (componentBrushingRef.current !== newComponent) cleanAllBrushes()
    setComponentBrushing(newComponent)
  }

  const isBrushingActive = componentBrushingRef.current !== null
  const viewProps = {
    dataset,
    setCleanBrushes,
    setComponentBrushing: setComponentBrushingAndClean,
    setSelected,
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

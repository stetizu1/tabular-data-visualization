import React, { FunctionComponent, useState } from 'react'
import { SelectableDataType } from '../../../types/data/data'
import { SideEffectVoid } from '../../../types/basic/functionTypes'
import { useUpdatedRef } from '../../../helpers/react/useUpdatedRef'
import { TopToolbar } from '../topToolbar/TopToolbar'
import { ViewGrid } from '../views/ViewGrid'

export const DataContext: FunctionComponent = () => {
  const [dataset, setDataset] = useState<Array<SelectableDataType> | null>(null)
  const [componentBrushing, setComponentBrushing] = useState<null | SVGGElement>(null)
  const [cleanBrushes, setCleanBrushes] = useState<SideEffectVoid[]>([])

  const cleanBrushesRef = useUpdatedRef(cleanBrushes)
  const componentBrushingRef = useUpdatedRef(componentBrushing)

  const setDatasetAndRemoveBrushing = (data: SelectableDataType[] | null) => {
    setDataset(data)
    setComponentBrushing(null)
  }

  const setSelected = (selected: boolean[]) => {
    setDataset((prev) => prev ? prev.map((data, idx) => ({ ...data, selected: selected[idx] })) : null)
  }

  const cleanAllBrushes = () => cleanBrushesRef.current.forEach((f) => f())
  const clearBrushesOnButton = () => {
    setComponentBrushing(null)
    cleanAllBrushes()
  }

  const cleanBrushesIfNewComponentBrushing = (newComponentBrushing: SVGGElement) => {
    if (componentBrushingRef.current !== newComponentBrushing)
      cleanAllBrushes()
  }

  const isBrushingActive = componentBrushingRef.current !== null
  const viewProps = {
    dataset: dataset,
    cleanBrushes: cleanBrushesIfNewComponentBrushing,
    setCleanBrushes,
    setComponentBrushing,
    setSelected,
    isBrushingActive,
    catAttribute: `species`, // todo
  }

  return <>
    <TopToolbar
      clearBrushes={clearBrushesOnButton}
      setData={setDatasetAndRemoveBrushing}
      brushingActive={isBrushingActive}
    />
    <ViewGrid {...viewProps} />
  </>
}

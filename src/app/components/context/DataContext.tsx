import React, { FunctionComponent, useState } from 'react'
import { TopToolbar } from '../topToolbar/TopToolbar'
import { ParallelCoordinates } from '../content/views/parallelCoordinates/ParallelCoordinates'
import { ScatterPlotMatrix } from '../content/views/scatterplot/ScatterPlotMatrix'
import { Glyphs } from '../content/views/glyphs/Glyphs'
import { SelectableDataType } from '../../types/data/data'
import { SideEffectVoid } from '../../types/basic/functionTypes'
import { useUpdatedRef } from '../../helpers/react/useUpdatedRef'
import { EmptySite } from '../content/empty/EmptySite'

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

  return <>
    <TopToolbar
      clearBrushes={clearBrushesOnButton}
      setData={setDatasetAndRemoveBrushing}
      brushingActive={isBrushingActive}
    />
    {!dataset ? <EmptySite /> : <>
      <ParallelCoordinates
        dataset={dataset} width={960} height={400} catAttribute={`species`}
        cleanBrushes={cleanBrushesIfNewComponentBrushing} setCleanBrushes={setCleanBrushes}
        setComponentBrushing={setComponentBrushing}
        setSelected={setSelected} isBrushingActive={isBrushingActive}
      />
      <ScatterPlotMatrix
        dataset={dataset} width={960} catAttribute={`species`}
        cleanBrushes={cleanBrushesIfNewComponentBrushing} setCleanBrushes={setCleanBrushes}
        setComponentBrushing={setComponentBrushing}
        setSelected={setSelected} isBrushingActive={componentBrushingRef.current !== null}
      />
      <Glyphs
        dataset={dataset} width={960} catAttribute={`species`} isBrushingActive={componentBrushingRef.current !== null}
      />
    </>}
  </>
}

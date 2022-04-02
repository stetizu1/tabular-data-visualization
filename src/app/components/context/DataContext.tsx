import React, { FunctionComponent, useState } from 'react'
import { FileReader } from '../data/FileReader'
import { ParallelCoordinates } from '../views/parallelCoordinates/ParallelCoordinates'
import { ScatterPlotMatrix } from '../views/scatterplot/ScatterPlotMatrix'
import { Glyphs } from '../views/glyphs/Glyphs'
import { SelectableDataType } from '../../types/data/data'
import { SideEffectVoid } from '../../types/basic/functionTypes'
import { useUpdatedRef } from '../../helpers/react/useUpdatedRef'

export const DataContext: FunctionComponent = () => {
  const [dataset, setDataset] = useState<Array<SelectableDataType> | null>(null)
  const [isBrushingActive, setIsBrushingActive] = useState<boolean>(false)
  const setData = (data: SelectableDataType[] | null) => {
    setDataset(data)
    setIsBrushingActive(false)
  }

  const [cleanBrushes, setCleanBrushes] = useState<SideEffectVoid[]>([])
  const [componentBrushing, setComponentBrushing] = useState<null | SVGGElement>(null)
  const setSelected = (selected: boolean[]) => {
    setDataset((prev) => prev ? prev.map((data, idx) => ({ ...data, selected: selected[idx] })) : null)
  }
  const cleanBrushesRef = useUpdatedRef(cleanBrushes)
  const componentBrushingRef = useUpdatedRef(componentBrushing)
  const clean = (newComponentBrushing: SVGGElement) => {
    if (componentBrushingRef.current !== newComponentBrushing)
      cleanBrushesRef.current.forEach((f) => f())
  }

  return <>
    <FileReader setData={setData} />
    {dataset && <>
      <ParallelCoordinates
        dataset={dataset} width={960} height={400} catAttribute={`species`}
        cleanBrushes={clean} setCleanBrushes={setCleanBrushes} setComponentBrushing={setComponentBrushing}
        setSelected={setSelected} isBrushingActive={isBrushingActive} setIsBrushingActive={setIsBrushingActive}
      />
      <ScatterPlotMatrix
        dataset={dataset} width={960} catAttribute={`species`}
        cleanBrushes={clean} setCleanBrushes={setCleanBrushes} setComponentBrushing={setComponentBrushing}
        setSelected={setSelected} isBrushingActive={isBrushingActive} setIsBrushingActive={setIsBrushingActive}
      />
      <Glyphs dataset={dataset} width={960} catAttribute={`species`} isBrushingActive={isBrushingActive} />
      <button onClick={() => {
        setIsBrushingActive(false)
        cleanBrushes.forEach((f) => {
          f()
        })
      }} style={{ margin: 20 }}>
          CLEAR BRUSHES
      </button>
    </>}
  </>
}

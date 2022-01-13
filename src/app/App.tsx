import React, { FunctionComponent, useRef, useState } from 'react'
import { useAppStyle } from './useAppStyle'
import { ScatterPlotMatrix } from './scatterplot/ScatterPlotMatrix'
import { addSelected } from './helpers/data'
import { Glyphs } from './glyphs/Glyphs'
import { peopleData } from './testData/peopleData'
import { CleanBrushFunction } from './helpers/brush'
import { ParallelCoordinates } from './parallelCoordinates/ParallelCoordinates'

const useUpdatedRef = <T, >(value: T) => {
  const valueRef = useRef<T>(value)
  valueRef.current = value
  return valueRef
}

export const App: FunctionComponent = () => {
  const style = useAppStyle()
  const [dataset, setDataset] = useState(addSelected(peopleData))
  const [cleanBrushes, setCleanBrushes] = useState<CleanBrushFunction[]>([])
  const [componentBrushing, setComponentBrushing] = useState<null | SVGGElement>(null)
  const setSelected = (selected: boolean[]) => {
    setDataset((prev) => prev.map((data, idx) => ({ ...data, selected: selected[idx] })))
  }
  const cleanBrushesRef = useUpdatedRef(cleanBrushes)
  const componentBrushingRef = useUpdatedRef(componentBrushing)
  const clean = (newComponentBrushing: SVGGElement) => {
    if (componentBrushingRef.current === newComponentBrushing)
      return
    cleanBrushesRef.current.forEach((f) => {
      f()
    })
  }
  const catAttribute = `species`

  return (
    <div className={style.app}>
      <header className={style.appHeader}>Table Data Visualizer</header>
      <p>Web Application for Table Data Visualization</p>
      <ParallelCoordinates
        dataset={dataset} width={960} height={400} setSelected={setSelected} catAttribute={catAttribute}
        clean={clean} setCleanBrushes={setCleanBrushes} setComponentBrushing={setComponentBrushing}
      />
      <ScatterPlotMatrix
        dataset={dataset} width={960} setSelected={setSelected} catAttribute={catAttribute}
        clean={clean} setCleanBrushes={setCleanBrushes} setComponentBrushing={setComponentBrushing}
      />
      <Glyphs dataset={dataset} width={960} height={600} catAttribute={catAttribute} />
      <button onClick={() => {
        cleanBrushes.forEach((f) => {
          f()
        })
      }} style={{ margin: 20 }}>CLEAR BRUSHES
      </button>
    </div>
  )
}

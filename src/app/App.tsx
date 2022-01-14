import React, { FunctionComponent, useRef, useState } from 'react'
import { useAppStyle } from './useAppStyle'
import { ScatterPlotMatrix } from './views/scatterplot/ScatterPlotMatrix'
import { addSelected, DataType, SelectableDataType } from './helpers/data'
import { Glyphs } from './views/glyphs/Glyphs'
import { CleanBrushFunction } from './helpers/brush'
import { ParallelCoordinates } from './views/parallelCoordinates/ParallelCoordinates'
import { birdData } from './testData/birdData'
import { flowerData } from './testData/flowerData'
import { carData } from './testData/carData'

const useUpdatedRef = <T, >(value: T) => {
  const valueRef = useRef<T>(value)
  valueRef.current = value
  return valueRef
}

export const App: FunctionComponent = () => {
  const style = useAppStyle()
  const datasets: DataType[] = [flowerData, birdData, carData] as unknown as DataType[]
  const catAttribute = [`species`, `species`, ``]
  const [dataset, setDataset] = useState<Array<SelectableDataType>>(addSelected(datasets[0] as unknown as DataType[]))
  const [isBrushingActive, setIsBrushingActive] = useState<boolean>(false)
  const [i, setI] = useState<number>(0)
  const toggleData = () => {
    const newI = (i + 1) % 3
    const data = datasets[newI]
    setDataset(addSelected(data as unknown as DataType[]))
    setIsBrushingActive(false)
    setI(newI)
  }
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

  return (
    <div className={style.app}>
      <header className={style.appHeader}>Table Data Visualizer</header>
      <p>Web Application for Table Data Visualization</p>
      <ParallelCoordinates
        dataset={dataset} width={960} height={400} catAttribute={catAttribute[i]} key={`PC${i}`}
        clean={clean} setCleanBrushes={setCleanBrushes} setComponentBrushing={setComponentBrushing}
        setSelected={setSelected} isBrushingActive={isBrushingActive} setIsBrushingActive={setIsBrushingActive}
      />
      <ScatterPlotMatrix
        dataset={dataset} width={960} catAttribute={catAttribute[i]}
        clean={clean} setCleanBrushes={setCleanBrushes} setComponentBrushing={setComponentBrushing} key={`SPM${i}`}
        setSelected={setSelected} isBrushingActive={isBrushingActive} setIsBrushingActive={setIsBrushingActive}
      />
      <Glyphs dataset={dataset} width={960} catAttribute={catAttribute[i]} isBrushingActive={isBrushingActive} key={`G${i}`} />
      <button onClick={() => {
        toggleData()
      }} style={{ margin: 20 }}>
        TOGGLE DATA
      </button>
      <button onClick={() => {
        setIsBrushingActive(false)
        cleanBrushes.forEach((f) => {
          f()
        })
      }} style={{ margin: 20 }}>
        CLEAR BRUSHES
      </button>
    </div>
  )
}

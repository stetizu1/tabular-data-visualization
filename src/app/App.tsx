import React, { FunctionComponent, useState } from 'react'
import { useAppStyle } from './useAppStyle'
import { flowerData } from './testData/flowerData'
import { ScatterPlotMatrix } from './scatterplot/ScatterPlotMatrix'
import { addSelected } from './helpers/data'


export const App: FunctionComponent = () => {
  const style = useAppStyle()
  const [dataset, setDataset] = useState(addSelected(flowerData))
  const setSelected = (selected: boolean[]) => {
    setDataset((prev) => prev.map((data, idx) => ({ ...data, selected: selected[idx] })))
  }

  return (
    <div className={style.app}>
      <header className={style.appHeader}>Table Data Visualizer</header>
      <p>Web Application for Table Data Visualization</p>
      <ScatterPlotMatrix dataset={dataset} width={960} setSelected={setSelected}/>
    </div>
  )
}

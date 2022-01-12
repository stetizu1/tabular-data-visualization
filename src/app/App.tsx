import React, { FunctionComponent, useState } from 'react'
import { useAppStyle } from './useAppStyle'
import { ScatterPlotMatrix } from './scatterplot/ScatterPlotMatrix'
import { addSelected } from './helpers/data'
import { Glyphs } from './glyphs/Glyphs'
import { peopleData } from './testData/peopleData'


export const App: FunctionComponent = () => {
  const style = useAppStyle()
  const [dataset, setDataset] = useState(addSelected(peopleData))
  const setSelected = (selected: boolean[]) => {
    setDataset((prev) => prev.map((data, idx) => ({ ...data, selected: selected[idx] })))
  }
  const catAttribute = `species`

  return (
    <div className={style.app}>
      <header className={style.appHeader}>Table Data Visualizer</header>
      <p>Web Application for Table Data Visualization</p>
      <ScatterPlotMatrix dataset={dataset} width={960} setSelected={setSelected} catAttribute={catAttribute} />
      <Glyphs dataset={dataset} width={960} height={600} catAttribute={catAttribute}/>
    </div>
  )
}

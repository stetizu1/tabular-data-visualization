import React, { FunctionComponent } from 'react'
import { useAppStyle } from './useAppStyle'
import { flowerData } from './testData/flowerData'
import { ScatterPlotMatrix } from './scatterplot/ScatterPlotMatrix'
import { peopleData } from './testData/peopleData'


export const App: FunctionComponent = () => {
  const style = useAppStyle()

  return (
    <div className={style.app}>
      <header className={style.appHeader}>Table Data Visualizer</header>
      <p>Web Application for Table Data Visualization</p>
      <ScatterPlotMatrix dataset={flowerData} width={960} />
      <ScatterPlotMatrix dataset={peopleData} width={1200} />
    </div>
  )
}

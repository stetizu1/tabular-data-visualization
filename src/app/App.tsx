import React, { FunctionComponent } from 'react'
import { useAppStyle } from './useAppStyle'
import { flowerData } from './testData/flowerData'
import { ScatterPlotMatrix } from './scatterplot/ScatterPlotMatrix'


export const App: FunctionComponent = () => {
  const style = useAppStyle()

  return (
    <div className={style.app}>
      <header className={style.appHeader}>Table Data Visualizer</header>
      <p>Web Application for Table Data Visualization</p>
      <ScatterPlotMatrix dataset={flowerData} width={960} />
    </div>
  )
}

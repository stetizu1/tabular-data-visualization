import React, { FunctionComponent } from 'react'
import { useAppStyle } from './useAppStyle'
import { BasicScatterPlot } from './scatterplot/BasicScatterPlot'
import { TestData, testData } from './test/testData'


export const App: FunctionComponent = () => {
  const style = useAppStyle()
  const data = testData
  const getValueX = (d: TestData) => d.sepalLength
  const getValueY = (d: TestData) => d.petalLength
  const getValueCat = (d: TestData) => d.species

  return (
    <div className={style.app}>
      <header className={style.appHeader}>Table Data Visualizer</header>
      <p>Web Application for Table Data Visualization</p>
      <BasicScatterPlot width={800} height={512} dataset={data} getValueX={getValueX} getValueY={getValueY} getValueCat={getValueCat} />
    </div>
  )
}

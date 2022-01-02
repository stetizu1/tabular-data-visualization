import React, { FunctionComponent } from 'react'
import { useAppStyle } from './useAppStyle'


export const App: FunctionComponent = () => {
  const style = useAppStyle()

  return (
    <div className={style.app}>
      <header className={style.appHeader}>Table Data Visualizer</header>
      <p>Web Application for Table Data Visualization</p>
    </div>
  )
}

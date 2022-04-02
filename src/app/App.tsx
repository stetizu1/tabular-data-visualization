import React, { FunctionComponent } from 'react'
import { Header } from './components/header/Header'
import { DataContext } from './components/context/DataContext'
import { HEADER_TEXT } from './text/HeaderText'
import { useAppStyle } from './useAppStyle'

export const App: FunctionComponent = () => {
  const style = useAppStyle()
  return (
    <div className={style.app}>
      <Header title={HEADER_TEXT.title} description={HEADER_TEXT.description} />
      <DataContext />
    </div>
  )
}

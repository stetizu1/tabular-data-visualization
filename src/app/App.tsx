import React, { FunctionComponent } from 'react'
import { Header } from './components/header/Header'
import { Footer } from './components/footer/Footer'
import { DataContext } from './components/content/context/DataContext'
import { useAppStyle } from './useAppStyle'

export const App: FunctionComponent = () => {
  const style = useAppStyle()
  return (
    <div className={style.app}>
      <Header />
      <div className={style.content}>
        <DataContext />
      </div>
      <Footer />
    </div>
  )
}

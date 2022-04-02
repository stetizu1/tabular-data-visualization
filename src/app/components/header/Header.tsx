import React, { FunctionComponent } from 'react'
import { useHeaderStyle } from './useHeaderStyle'

export interface HeaderProps {
  title: string
  description: string
}

export const Header:FunctionComponent<HeaderProps> = ({ title, description }) => {
  const style = useHeaderStyle()
  return <header className={style.headerContainer}>
    <div className={style.title}>{title}</div>
    <div className={style.description}>{description}</div>
  </header>
}

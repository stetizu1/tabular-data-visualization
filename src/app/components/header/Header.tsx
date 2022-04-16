import React, { FunctionComponent } from 'react'
import { HEADER_TEXT } from '../../text/HeaderText'
import { useHeaderStyle } from './useHeaderStyle'

export const Header: FunctionComponent = () => {
  const style = useHeaderStyle()
  return (
    <header className={style.headerContainer}>
      <div className={style.title}>{HEADER_TEXT.title}</div>
      <div className={style.description}>{HEADER_TEXT.description}</div>
    </header>
  )
}

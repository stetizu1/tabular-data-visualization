import { VoidFunctionComponent } from 'react'

import { HEADER_TEXT } from '../../text/HeaderText'

import { useHeaderStyle } from '../../components-style/header/useHeaderStyle'

export const Header: VoidFunctionComponent = () => {
  const style = useHeaderStyle()
  return (
    <header className={style.headerContainer}>
      <div className={style.title}>{HEADER_TEXT.title}</div>
      <div className={style.description}>{HEADER_TEXT.description}</div>
    </header>
  )
}

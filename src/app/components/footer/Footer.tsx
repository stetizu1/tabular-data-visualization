import React, { FunctionComponent } from 'react'
import { FOOTER_TEXT } from '../../text/FooterText'
import { useFooterStyle } from './useFooterStyle'

export const Footer:FunctionComponent = () => {
  const style = useFooterStyle()
  return <header className={style.footerContainer}>
    <div className={style.text}>{FOOTER_TEXT.author},</div>
    <div className={style.text}>&copy; {FOOTER_TEXT.school}, {FOOTER_TEXT.year}</div>
  </header>
}

import { FunctionComponent } from 'react'
import { EMPTY_SITE_TEXT } from '../../../text/SiteText'
import { useEmptySiteStyle } from './useEmptySiteStyle'

export const EmptySite: FunctionComponent = () => {
  const classes = useEmptySiteStyle()
  return <div className={classes.site}>
    {EMPTY_SITE_TEXT.content}
  </div>
}

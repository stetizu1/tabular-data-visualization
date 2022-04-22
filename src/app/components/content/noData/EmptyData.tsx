import { FunctionComponent } from 'react'

import { EMPTY_DATA_TEXT } from '../../../text/SiteText'

import { useEmptyDataStyle } from './useEmptyDataStyle'

export const EmptyData: FunctionComponent = () => {
  const classes = useEmptyDataStyle()
  return <div className={classes.site}>{EMPTY_DATA_TEXT.content}</div>
}

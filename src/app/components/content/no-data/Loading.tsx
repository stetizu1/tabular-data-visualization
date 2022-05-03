import { VoidFunctionComponent } from 'react'

import { useLoadingStyle } from '../../../components-style/content/no-data/useLoadingStyle'
import { EMPTY_DATA_TEXT } from '../../../text/SiteText'

export const Loading: VoidFunctionComponent = () => {
  const classes = useLoadingStyle()
  return <div className={classes.load}>{EMPTY_DATA_TEXT.loading}</div>
}

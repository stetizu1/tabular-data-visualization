import { FunctionComponent } from 'react'
import { CircularProgress } from '@mui/material'

import { useLoadingStyle } from '../../../components-style/content/no-data/useLoadingStyle'

export const Loading: FunctionComponent = () => {
  const classes = useLoadingStyle()
  return (
    <div className={classes.load}>
      <CircularProgress />
    </div>
  )
}

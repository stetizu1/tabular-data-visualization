import { makeStyles } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core'

export interface StyleProps {
  width: number
  height: number
}

export const useViewStyle = makeStyles<Theme, StyleProps>(() => ({
  box: {
    width: ({ width }) => width,
    height: ({ height }) => height,
    overflow: `hidden`,
  },
}))

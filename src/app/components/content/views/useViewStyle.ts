import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

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

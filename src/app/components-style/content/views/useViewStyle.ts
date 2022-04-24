import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

export interface StyleProps {
  width: number
  height: number
}

const BORDER_SIZE = 5

export const useViewStyle = makeStyles<Theme, StyleProps>(() => ({
  box: {
    width: ({ width }) => width,
    height: ({ height }) => height + BORDER_SIZE,
    overflowX: `hidden`,
    overflowY: `auto`,
    margin: `5px 0`,
  },
}))

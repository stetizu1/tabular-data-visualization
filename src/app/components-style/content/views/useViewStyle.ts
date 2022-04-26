import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

import { Dimensions } from '../../../types/basic/dimensions'

const BORDER_SIZE = 5

export const useViewStyle = makeStyles<Theme, Dimensions>(() => ({
  box: {
    width: ({ width }) => width,
    height: ({ height }) => height + BORDER_SIZE,
    overflowX: `hidden`,
    overflowY: `auto`,
    margin: `5px 0`,
  },
}))

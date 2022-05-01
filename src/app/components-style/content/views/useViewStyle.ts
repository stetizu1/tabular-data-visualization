import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

import { Dimensions } from '../../../types/basic/dimensions'

export const useViewStyle = makeStyles<Theme, Dimensions>(() => ({
  box: {
    width: ({ width }) => width,
    height: ({ height }) => height,
    overflowX: `hidden`,
    overflowY: `auto`,
  },
}))

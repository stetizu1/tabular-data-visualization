import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

import { Dimensions } from '../../../types/basic/dimensions'
import { px } from '../../../helpers/d3/stringGetters'

const BORDER_SIZE = 5

export const useViewStyle = makeStyles<Theme, Dimensions>(() => ({
  box: {
    width: ({ width }) => width,
    height: ({ height }) => height + BORDER_SIZE,
    overflowX: `hidden`,
    overflowY: `auto`,
    margin: px(5, 0),
  },
}))

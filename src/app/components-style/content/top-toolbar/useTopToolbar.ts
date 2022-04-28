import { makeStyles } from '@mui/styles'

import { TOP_TOOLBAR_COLORS } from '../../../styles/colors'
import { border, px } from '../../../helpers/d3/stringGetters'

export const useTopToolbar = makeStyles({
  toolbar: {
    width: `100%`,
    padding: px(10, 0),
    display: `flex`,
    justifyContent: `space-between`,
    alignItems: `flex-end`,
    backgroundColor: TOP_TOOLBAR_COLORS.backgroundColor,
    color: TOP_TOOLBAR_COLORS.fontColor,
  },
  left: {
    display: `flex`,
  },
  separator: {
    flexGrow: 1,
    borderLeft: border(2, `#57607a`),
  },
})

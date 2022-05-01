import { makeStyles } from '@mui/styles'

import { TOP_TOOLBAR_COLORS } from '../../../styles/colors'
import { border, px } from '../../../helpers/d3/stringGetters'

export const useTopToolbar = makeStyles({
  toolbar: {
    width: `100%`,
    padding: px(10, 0),
    display: `flex`,
    justifyContent: `space-between`,
    alignItems: `stretch`,
    background: TOP_TOOLBAR_COLORS.background,
    color: TOP_TOOLBAR_COLORS.font,
  },
  left: {
    display: `flex`,
    margin: px(0, 12),
    alignItems: `center`,
  },
  separator: {
    height: `100%`,
    margin: px(0, 4),
    borderLeft: border(2, TOP_TOOLBAR_COLORS.border),
  },
  right: {
    display: `flex`,
  },
})

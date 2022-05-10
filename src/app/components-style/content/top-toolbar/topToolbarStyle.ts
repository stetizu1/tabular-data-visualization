import { SxProps } from '@mui/system'

import { border, px } from '../../../helpers/stringGetters'

import { TOP_TOOLBAR_COLORS } from '../../../styles/colors'

export const topToolbarStyle: Record<string, SxProps> = {
  toolbar: {
    width: `100%`,
    padding: px(10, 0),
    display: `flex`,
    justifyContent: `space-between`,
    alignItems: `stretch`,
    bgcolor: TOP_TOOLBAR_COLORS.background,
    color: TOP_TOOLBAR_COLORS.font,
  },
  separator: {
    height: `100%`,
    margin: px(0, 4),
    borderLeft: border(2, TOP_TOOLBAR_COLORS.border),
  },
  left: {
    display: `flex`,
    margin: px(0, 12),
    alignItems: `center`,
  },
  middle: {
    display: `flex`,
    alignItems: `center`,
  },
  right: {
    display: `flex`,
    alignItems: `center`,
  },
}

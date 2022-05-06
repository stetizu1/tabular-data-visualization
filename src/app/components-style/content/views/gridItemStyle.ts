import { SxProps } from '@mui/system'

import { HEADER_HEIGHT } from '../../../constants/views/common'
import { px } from '../../../helpers/d3/stringGetters'
import { VIEW_COLORS } from '../../../styles/colors'

export const gridItemStyle: Record<string, SxProps> = {
  gridItem: {
    height: `100%`,
    bgcolor: VIEW_COLORS.itemBackground,
    borderColor: VIEW_COLORS.border,
    borderWidth: 1,
    borderStyle: `solid`,
  },
  text: {
    padding: px(0, 8),
  },
  header: {
    height: HEADER_HEIGHT - 2,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `space-between`,
    cursor: `all-scroll`,
    bgcolor: VIEW_COLORS.itemBackground,
    borderColor: VIEW_COLORS.border,
    borderBottomWidth: 1,
    borderBottomStyle: `solid`,
    padding: 0,
  },
}

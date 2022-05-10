import { SxProps } from '@mui/system'

import { px } from '../../../helpers/stringGetters'

import { GRID_HEADER_HEIGHT } from '../../../constants/layout/layout'

import { VIEW_COLORS } from '../../../styles/colors'

export const gridItemStyle: Record<string, SxProps> = {
  gridItem: {
    height: `100%`,
    bgcolor: VIEW_COLORS.itemBackground,
    borderColor: VIEW_COLORS.border,
    borderWidth: 1,
    borderStyle: `solid`,
  },
  right: {
    display: `flex`,
    flexWrap: `nowrap`,
    paddingLeft: px(5),
  },
  textBox: {
    padding: px(0, 8),
    display: `flex`,
    whiteSpace: `nowrap`,
    overflow: `hidden`,
    textOverflow: `ellipsis`,
  },
  text: {
    padding: px(0, 5),
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
    fontSize: px(12),
  },
  textIcon: {
    fontSize: px(14),
    padding: px(4),
  },
  header: {
    height: GRID_HEADER_HEIGHT - 2,
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

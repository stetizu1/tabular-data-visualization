import { SxProps } from '@mui/system'

import { calc, px } from '../../helpers/stringGetters'

import { HEADER_COLORS } from '../../styles/colors'

export const headerStyle: Record<string, SxProps> = {
  headerContainer: {
    bgcolor: HEADER_COLORS.background,
    padding: px(10, 0),
    width: `100%`,
    display: `flex`,
    flexDirection: `row`,
    alignItems: `flex-end`,
    justifyContent: `space-between`,
    color: HEADER_COLORS.font,
  },
  title: {
    fontSize: calc(5, `2vmin`),
    padding: px(0, 20),
  },
  description: {
    padding: px(0, 15),
    fontSize: calc(2, `1vmin`),
  },
}

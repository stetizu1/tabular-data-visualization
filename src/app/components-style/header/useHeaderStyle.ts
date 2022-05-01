import { makeStyles } from '@mui/styles'

import { px } from '../../helpers/d3/stringGetters'
import { HEADER_COLORS } from '../../styles/colors'
import { HEADER_FONT } from '../../styles/font'

export const useHeaderStyle = makeStyles({
  headerContainer: {
    background: HEADER_COLORS.background,
    padding: px(10, 0),
    width: `100%`,
    display: `flex`,
    flexDirection: `row`,
    alignItems: `flex-end`,
    justifyContent: `space-between`,
    color: HEADER_COLORS.font,
  },
  title: {
    fontSize: HEADER_FONT.titleFontSize,
    padding: px(0, 20),
  },
  description: {
    padding: px(0, 15),
    fontSize: HEADER_FONT.descriptionFontSize,
  },
})

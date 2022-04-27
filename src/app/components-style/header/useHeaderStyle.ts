import { makeStyles } from '@mui/styles'

import { calc, px } from '../../helpers/d3/stringGetters'
import { HEADER_COLORS } from '../../styles/colors'

export const useHeaderStyle = makeStyles({
  headerContainer: {
    backgroundColor: HEADER_COLORS.backgroundColor,
    padding: px(10, 0),
    width: `100%`,
    display: `flex`,
    flexDirection: `row`,
    alignItems: `flex-end`,
    justifyContent: `space-between`,
    color: HEADER_COLORS.fontColor,
  },
  title: {
    fontSize: calc(5, `2vmin`),
    padding: px(0, 20),
  },
  description: {
    padding: px(0, 15),
    fontSize: calc(2, `1vmin`),
  },
})

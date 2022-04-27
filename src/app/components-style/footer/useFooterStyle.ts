import { makeStyles } from '@mui/styles'

import { calc, px } from '../../helpers/d3/stringGetters'
import { FOOTER_COLORS } from '../../styles/colors'

export const useFooterStyle = makeStyles({
  footerContainer: {
    backgroundColor: FOOTER_COLORS.backgroundColor,
    color: FOOTER_COLORS.fontColor,
    padding: px(10, 0),
    width: `100%`,
    display: `flex`,
    flexDirection: `column`,
    alignItems: `flex-end`,
    justifyContent: `flex-end`,
  },
  text: {
    padding: px(0, 15),
    fontSize: calc(2, `1vmin`),
  },
})

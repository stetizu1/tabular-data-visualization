import { makeStyles } from '@mui/styles'

import { px } from '../../helpers/d3/stringGetters'
import { FOOTER_COLORS } from '../../styles/colors'
import { FOOTER_FONT } from '../../styles/font'

export const useFooterStyle = makeStyles({
  footerContainer: {
    background: FOOTER_COLORS.background,
    color: FOOTER_COLORS.font,
    padding: px(10, 0),
    width: `100%`,
    display: `flex`,
    flexDirection: `column`,
    alignItems: `flex-end`,
    justifyContent: `flex-end`,
  },
  text: {
    padding: px(0, 15),
    fontSize: FOOTER_FONT.fontSize,
  },
})

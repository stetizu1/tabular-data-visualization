import { SxProps } from '@mui/system'

import { calc, px } from '../../helpers/stringGetters'

import { FOOTER_COLORS } from '../../styles/colors'

export const footerStyle: Record<string, SxProps> = {
  footerContainer: {
    bgcolor: FOOTER_COLORS.background,
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
    fontSize: calc(2, `1vmin`),
  },
}

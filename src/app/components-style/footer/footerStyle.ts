import { SxProps } from '@mui/system'

import { calc, px } from '../../helpers/stringGetters'

import { FOOTER_COLORS, SETTINGS_DRAWER_COLORS } from '../../styles/colors'

export const footerStyle: Record<string, SxProps> = {
  footerContainer: {
    bgcolor: FOOTER_COLORS.background,
    color: FOOTER_COLORS.font,
    width: calc(-30, `100%`),
    padding: px(10, 15),
    display: `flex`,
    justifyContent: `space-between`,
  },
  right: {
    display: `flex`,
    flexDirection: `column`,
    alignItems: `flex-end`,
  },
  text: {
    fontSize: calc(2, `1vmin`),
    color: SETTINGS_DRAWER_COLORS.icon,
    display: `flex`,
    alignItems: `center`,
  },
  githubIcon: {
    padding: px(0, 6),
    fontSize: px(14),
  },
}

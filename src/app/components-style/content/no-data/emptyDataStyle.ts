import { SxProps } from '@mui/system'

import { px } from '../../../helpers/stringGetters'

import { SITE_COLORS } from '../../../styles/colors'

export const emptyDataStyle: Record<string, SxProps> = {
  content: {
    display: `flex`,
    flexDirection: `column`,
    alignItems: `center`,
  },
  icon: {
    marginRight: px(6),
    opacity: 0.6,
  },
  text: {
    paddingTop: px(40),
    color: SITE_COLORS.font,
  },
  button: {
    marginTop: px(45),
    opacity: 0.7,
  },
}

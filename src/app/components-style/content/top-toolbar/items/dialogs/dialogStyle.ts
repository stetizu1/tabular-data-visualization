import { SxProps } from '@mui/system'
import { important, px } from '../../../../../helpers/d3/stringGetters'
import { SITE_COLORS, ERROR_COLORS } from '../../../../../styles/colors'

export const dialogStyle: Record<string, SxProps> = {
  alert: {
    color: important(ERROR_COLORS.font),
  },
  text: {
    padding: px(25, 30, 20),
    color: SITE_COLORS.font,
  },
}

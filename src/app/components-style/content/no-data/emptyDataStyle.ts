import { SxProps } from '@mui/system'
import { px } from '../../../helpers/d3/stringGetters'
import { SITE_COLORS } from '../../../styles/colors'

export const emptyDataStyle: Record<string, SxProps> = {
  site: {
    paddingTop: px(20),
    color: SITE_COLORS.font,
  },
}

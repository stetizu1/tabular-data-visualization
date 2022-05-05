import { SxProps } from '@mui/system'
import { DATA_DRAWER_FONT } from '../../../../styles/font'
import { px } from '../../../../helpers/d3/stringGetters'

export const menuTextStyle: Record<string, SxProps> = {
  text: {
    fontSize: px(DATA_DRAWER_FONT.fontSize),
    padding: px(6, 5, 3),
  },
}

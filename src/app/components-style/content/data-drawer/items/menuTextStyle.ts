import { SxProps } from '@mui/system'

import { px } from '../../../../helpers/stringGetters'

import { DATA_DRAWER_FONT } from '../../../../styles/font'

export const menuTextStyle: Record<string, SxProps> = {
  text: {
    fontSize: px(DATA_DRAWER_FONT.fontSize),
    padding: px(6, 5, 3),
  },
}

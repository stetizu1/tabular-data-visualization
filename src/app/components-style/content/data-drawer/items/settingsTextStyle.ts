import { SxProps } from '@mui/system'

import { px } from '../../../../helpers/stringGetters'

import { SETTINGS_DRAWER_FONT } from '../../../../styles/font'

export const settingsTextStyle: Record<string, SxProps> = {
  text: {
    fontSize: px(SETTINGS_DRAWER_FONT.fontSize),
    padding: px(6, 5, 3),
  },
}

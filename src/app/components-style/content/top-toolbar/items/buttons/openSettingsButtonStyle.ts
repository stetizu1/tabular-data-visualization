import { SxProps } from '@mui/system'

import { px } from '../../../../../helpers/stringGetters'

import { BUTTON_COLORS } from '../../../../../styles/colors'

export const openSettingsButtonStyle: Record<string, SxProps> = {
  settings: {
    margin: px(0, 10, 0, 6),
    padding: px(4),
    color: BUTTON_COLORS.buttonOnBackground,
    '& svg': {
      fontSize: px(30),
    },
    '& .Mui-disabled': {
      color: BUTTON_COLORS.buttonOnBackground,
    },
  },
}

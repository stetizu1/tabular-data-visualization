import { SxProps } from '@mui/system'

import { px } from '../../../../../helpers/d3/stringGetters'
import { BUTTON_COLORS } from '../../../../../styles/colors'

export const openSettingsButtonStyle: Record<string, SxProps> = {
  settings: {
    margin: px(0, 10, 0, 6),
    color: BUTTON_COLORS.buttonOnBackground,
    '& .Mui-disabled': {
      color: BUTTON_COLORS.buttonOnBackground,
    },
  },
}

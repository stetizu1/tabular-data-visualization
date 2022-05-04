import { SxProps } from '@mui/system'

import { important, px } from '../../../../../helpers/d3/stringGetters'
import { BUTTON_COLORS } from '../../../../../styles/colors'

export const openSettingsButtonStyle: Record<string, SxProps> = {
  settings: {
    margin: important(px(0, 7, 0, 5)),
    '& .Mui-disabled': {
      color: BUTTON_COLORS.buttonOnBackground,
    },
  },
}

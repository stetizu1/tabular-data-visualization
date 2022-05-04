import { SxProps } from '@mui/system'

import { border, px } from '../../../../../helpers/d3/stringGetters'
import { BUTTON_COLORS } from '../../../../../styles/colors'

export const topToolbarButtonStyle: Record<string, SxProps> = {
  button: {
    margin: px(0, 5),
    padding: px(4),
    minWidth: 0,
    '&.MuiButtonBase-root': {
      bgcolor: BUTTON_COLORS.buttonDisableBackground,
      color: BUTTON_COLORS.fontDisabled,
      border: border(1, BUTTON_COLORS.border),
    },
    '&.MuiButtonBase-root:not(.Mui-disabled)': {
      bgcolor: BUTTON_COLORS.buttonOnBackground,
      color: BUTTON_COLORS.fontOn,
      '&.MuiToggleButton-root:not(.Mui-selected)': {
        bgcolor: BUTTON_COLORS.buttonOffBackground,
        color: BUTTON_COLORS.fontOff,
      },
    },
  },
}

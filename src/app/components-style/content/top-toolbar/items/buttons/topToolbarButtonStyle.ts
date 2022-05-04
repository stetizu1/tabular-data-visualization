import { SxProps } from '@mui/system'

import { important, px } from '../../../../../helpers/d3/stringGetters'
import { BUTTON_COLORS } from '../../../../../styles/colors'

export const topToolbarButtonStyle: Record<string, SxProps> = {
  button: {
    margin: important(px(0, 5)),
    padding: important(px(4)),
    minWidth: important(0),
    '&.MuiButtonBase-root': {
      bgcolor: important(BUTTON_COLORS.buttonOffBackground),
    },
    '&.Mui-selected:not(.Mui-disabled)': {
      bgcolor: important(BUTTON_COLORS.buttonOnBackground),
    },
    '&.MuiButton-contained:not(.Mui-disabled)': {
      bgcolor: important(BUTTON_COLORS.buttonOnBackground),
      color: BUTTON_COLORS.fontOn,
    },
  },
}

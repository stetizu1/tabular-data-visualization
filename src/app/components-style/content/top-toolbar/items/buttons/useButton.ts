import { makeStyles } from '@mui/styles'

import { important, px } from '../../../../../helpers/d3/stringGetters'
import { BUTTON_COLORS } from '../../../../../styles/colors'

export const useButton = makeStyles({
  button: {
    margin: important(px(0, 7)),
    padding: important(px(4)),
    minWidth: important(0),
    '&.MuiButtonBase-root': {
      background: important(BUTTON_COLORS.buttonOffBackground),
    },
    '&.Mui-selected': {
      background: important(BUTTON_COLORS.buttonOnBackground),
    },
    '&.MuiButton-contained:not(.Mui-disabled)': {
      background: important(BUTTON_COLORS.buttonOnBackground),
      color: BUTTON_COLORS.fontOn,
    },
  },
})

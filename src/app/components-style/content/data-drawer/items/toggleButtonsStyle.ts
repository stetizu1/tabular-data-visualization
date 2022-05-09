import { SxProps } from '@mui/system'
import { important, px } from '../../../../helpers/d3/stringGetters'
import { BUTTON_COLORS } from '../../../../styles/colors'

export const toggleButtonsStyle: Record<string, SxProps> = {
  box: {
    marginTop: important(0),
  },
  group: {
    width: `100%`,
    display: `flex`,
  },
  button: {
    flexGrow: 1,
    padding: px(2, 5),
    '&.Mui-selected': {
      bgcolor: BUTTON_COLORS.buttonOnBackground,
    },
  },
}

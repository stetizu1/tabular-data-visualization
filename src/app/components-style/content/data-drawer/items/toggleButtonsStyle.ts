import { SxProps } from '@mui/system'
import { px } from '../../../../helpers/d3/stringGetters'
import { BUTTON_COLORS } from '../../../../styles/colors'

export const toggleButtonsStyle: Record<string, SxProps> = {
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

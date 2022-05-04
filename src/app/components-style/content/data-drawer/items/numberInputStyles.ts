import { SxProps } from '@mui/system'

import { px } from '../../../../helpers/d3/stringGetters'
import { DATA_DRAWER_FONT } from '../../../../styles/font'

export const numberInputStyles: Record<string, SxProps> = {
  vertical: {
    display: `flex`,
    flexDirection: `column`,
  },
  horizontal: {
    display: `flex`,
    flexDirection: `row`,
  },
  text: {
    fontSize: px(DATA_DRAWER_FONT.fontSize),
    padding: px(6, 5, 3),
  },
  textField: {
    '&.MuiFormControl-root': {
      margin: px(6, 6, 4),
    },
    '& input': {
      padding: px(5, 10, 4),
    },
  },
}

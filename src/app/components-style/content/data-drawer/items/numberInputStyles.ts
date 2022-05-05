import { SxProps } from '@mui/system'

import { px } from '../../../../helpers/d3/stringGetters'

export const numberInputStyles: Record<string, SxProps> = {
  vertical: {
    display: `flex`,
    flexDirection: `column`,
  },
  horizontal: {
    display: `flex`,
    flexDirection: `row`,
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

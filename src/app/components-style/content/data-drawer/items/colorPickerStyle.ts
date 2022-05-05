import { SxProps } from '@mui/system'

import { px } from '../../../../helpers/d3/stringGetters'

export const getColorPickerInputStyle = (color: string): SxProps => ({
  bgcolor: color,
  width: px(25),
  borderRadius: px(5),
  '& input': {
    width: `100%`,
    height: px(25),
    opacity: 0,
  },
})

export const colorPickerStyle: Record<string, SxProps> = {
  picker: {
    display: `flex`,
    justifyContent: `space-between`,
    alignItems: `center`,
  },
}

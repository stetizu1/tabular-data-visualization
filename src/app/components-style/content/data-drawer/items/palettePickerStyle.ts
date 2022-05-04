import { SxProps } from '@mui/system'

import { ColorArray } from '../../../../types/styling/ColorArray'
import { important, px } from '../../../../helpers/d3/stringGetters'
import { DATA_DRAWER_FONT } from '../../../../styles/font'

export const getColorInputStyle = (colors: ColorArray, index: number): SxProps => ({
  bgcolor: colors[index],
  '& input': {
    width: `100%`,
    height: px(20),
    opacity: 0,
  },
})

export const palettePickerStyle: Record<string, SxProps> = {
  picker: {
    margin: px(5, 7),
  },
  text: {
    fontSize: important(px(DATA_DRAWER_FONT.fontSize)),
  },
  row: {
    display: `flex`,
    flexDirection: `row`,
  },
  col: {
    display: `flex`,
    flexDirection: `column`,
    width: `20%`,
  },
}

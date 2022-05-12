import { SxProps } from '@mui/system'

import { ColorArray } from '../../../../types/styling/ColorArray'

import { px } from '../../../../helpers/stringGetters'

import { SETTINGS_DRAWER_FONT } from '../../../../styles/font'

export const getPalettePickerColorInputStyle = (colors: ColorArray, index: number): SxProps => ({
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
    fontSize: px(SETTINGS_DRAWER_FONT.fontSize),
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

import { SxProps } from '@mui/system'

import { border, px } from '../../../../../helpers/stringGetters'

import { BUTTON_COLORS, HIGHLIGHT_COLOR } from '../../../../../styles/colors'

export const getFileReaderBoxStyle = (isHighlighted: boolean): SxProps => ({
  transition: `0.3s all ease`,
  border: isHighlighted ? border(2, HIGHLIGHT_COLOR.border) : border(0, HIGHLIGHT_COLOR.border),
  bgcolor: isHighlighted ? HIGHLIGHT_COLOR.background : HIGHLIGHT_COLOR.backgroundGone,

  padding: isHighlighted ? px(8, 2) : 0,
  borderRadius: px(10),
})

export const fileReaderStyle: Record<string, SxProps> = {
  button: {
    margin: px(0, 3, 0, 2),
    padding: px(6, 12, 6, 8),
    bgcolor: BUTTON_COLORS.buttonOnBackground,
    color: BUTTON_COLORS.fontOn,
    '&:hover': {
      bgcolor: BUTTON_COLORS.buttonHoverBackground,
    },
    '& svg': {
      paddingRight: px(5),
    },
  },
}

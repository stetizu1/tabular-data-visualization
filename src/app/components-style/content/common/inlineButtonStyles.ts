import { SxProps } from '@mui/system'

import { px } from '../../../helpers/stringGetters'

import { BUTTON_COLORS } from '../../../styles/colors'

const inlineButton = {
  margin: 0,
  padding: px(0, 4),
  minWidth: 0,
}

export const inlineButtonStyles: Record<string, SxProps> = {
  button: {
    ...inlineButton,
    color: BUTTON_COLORS.buttonInlined,
  },
  buttonClose: {
    ...inlineButton,
    color: BUTTON_COLORS.buttonClose,
  },
  buttonActive: {
    color: BUTTON_COLORS.buttonInlinedFontOn,
    bgcolor: BUTTON_COLORS.buttonInlinedBgOn,
    borderRadius: px(5),
  },
}

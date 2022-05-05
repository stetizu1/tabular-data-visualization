import { SxProps } from '@mui/system'
import { border, px } from '../../../../../helpers/d3/stringGetters'
import { BUTTON_COLORS } from '../../../../../styles/colors'

export const getColorInputStyle = (disabled?: boolean): SxProps => ({
  display: `flex`,
  '& .MuiSvgIcon-root': {
    color: disabled ? BUTTON_COLORS.fontDisabled : BUTTON_COLORS.buttonOnBackground,
  },
})

export const getColorInputBoxStyle = (color: string, disabled?: boolean): SxProps => ({
  bgcolor: disabled ? BUTTON_COLORS.fontDisabled : color,
  minWidth: px(25),
  minHeight: px(25),
  borderRadius: px(5),
  ml: px(2),
  border: border(1, disabled ? BUTTON_COLORS.buttonDisableBackground : BUTTON_COLORS.colorBorder),
})

export const colorInputStyle: Record<string, SxProps> = {
  inputBox: {
    position: `relative`,
    '& input': {
      width: `100%`,
      opacity: 0,
      position: `absolute`,
      left: 0,
    },
  },
}

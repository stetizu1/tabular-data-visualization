import { SxProps } from '@mui/system'
import { BUTTON_COLORS } from '../../../styles/colors'

export const inlineButtonStyles: Record<string, SxProps> = {
  button: {
    margin: 0,
    padding: 0,
    minWidth: 0,
    color: BUTTON_COLORS.buttonInlined,
  },
}

import { SxProps } from '@mui/system'
import { important } from '../../../../helpers/d3/stringGetters'
import { BUTTON_COLORS } from '../../../../styles/colors'

export const drawerButtonStyles: Record<string, SxProps> = {
  button: {
    margin: important(0),
    padding: important(0),
    minWidth: important(0),
    color: important(BUTTON_COLORS.buttonInlined),
  },
}

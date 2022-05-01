import { makeStyles } from '@mui/styles'
import { important } from '../../../../helpers/d3/stringGetters'
import { BUTTON_COLORS } from '../../../../styles/colors'

export const useDrawerButtonStyles = makeStyles({
  button: {
    margin: important(0),
    padding: important(0),
    minWidth: important(0),
    color: important(BUTTON_COLORS.buttonInlined),
  },
})

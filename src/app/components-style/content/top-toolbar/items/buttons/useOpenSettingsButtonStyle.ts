import { makeStyles } from '@mui/styles'
import { important } from '../../../../../helpers/d3/stringGetters'
import { BUTTON_COLORS } from '../../../../../styles/colors'

export const useOpenSettingsButtonStyle = makeStyles({
  settings: {
    color: important(BUTTON_COLORS.buttonOnBackground),
  },
})

import { makeStyles } from '@mui/styles'
import { important, px } from '../../../../../helpers/d3/stringGetters'
import { BUTTON_COLORS } from '../../../../../styles/colors'

export const useOpenSettingsButtonStyle = makeStyles({
  settingsActive: {
    color: important(BUTTON_COLORS.buttonOnBackground),
  },
  settings: {
    margin: important(px(0, 7, 0, 5)),
  },
})

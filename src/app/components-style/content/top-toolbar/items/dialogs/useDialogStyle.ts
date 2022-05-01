import { makeStyles } from '@mui/styles'
import { important, px } from '../../../../../helpers/d3/stringGetters'
import { SITE_COLORS, ERROR_COLORS } from '../../../../../styles/colors'

export const useDialogStyle = makeStyles({
  alert: {
    color: important(ERROR_COLORS.font),
  },
  text: {
    padding: px(25, 30, 20),
    color: SITE_COLORS.font,
  },
})

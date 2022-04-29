import { makeStyles } from '@mui/styles'
import { ERROR_COLORS } from '../../../../../styles/colors'
import { important } from '../../../../../helpers/d3/stringGetters'

export const useDialogStyle = makeStyles({
  list: {
    pt: 0,
  },
  alert: {
    color: important(ERROR_COLORS.font),
  },
})

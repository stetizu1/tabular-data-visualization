import { makeStyles } from '@mui/styles'
import { px } from '../../../../helpers/d3/stringGetters'

export const useMarginInputStyles = makeStyles({
  vertical: {
    display: `flex`,
    flexDirection: `column`,
  },
  horizontal: {
    display: `flex`,
    flexDirection: `row`,
  },
  textField: {
    '&.MuiFormControl-root': {
      margin: px(6, 6, 4),
    },
    '& input': {
      padding: px(5, 10, 4),
    },
  },
})

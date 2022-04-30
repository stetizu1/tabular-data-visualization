import { makeStyles } from '@mui/styles'
import { important, px } from '../../../../helpers/d3/stringGetters'

export const useDrawerButtonStyles = makeStyles({
  button: {
    margin: important(px(15, 0, 0)),
    padding: important(px(5, 7)),
    minWidth: important(0),
    alignSelf: `flex-end`,
  },
})

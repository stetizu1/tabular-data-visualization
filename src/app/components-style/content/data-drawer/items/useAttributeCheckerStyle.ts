import { makeStyles } from '@mui/styles'
import { important, px } from '../../../../helpers/d3/stringGetters'

export const useAttributeCheckerStyle = makeStyles({
  buttons: {
    display: `flex`,
    flexDirection: `column`,
  },
  control: {
    margin: important(px(0, 5)),
    padding: important(0),
    minWidth: important(0),
    height: important(px(15)),
  },
})

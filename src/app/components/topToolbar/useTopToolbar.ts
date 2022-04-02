import { makeStyles } from '@material-ui/core/styles'
import { TOP_TOOLBAR_COLORS } from '../../styles/colors'

export const useTopToolbar = makeStyles({
  toolbar: {
    width: `100%`,
    padding: `10px 0`,
    display: `flex`,
    justifyContent: `space-between`,
    alignItems: `flex-end`,
    backgroundColor: TOP_TOOLBAR_COLORS.backgroundColor,
    color: TOP_TOOLBAR_COLORS.fontColor,
  },
})

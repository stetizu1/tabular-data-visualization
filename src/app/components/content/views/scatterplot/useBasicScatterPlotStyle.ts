import { makeStyles } from '@material-ui/core/styles'
import { PLOT_COLORS } from '../../../../styles/colors'


export const useBasicScatterPlotStyle = makeStyles({
  svg: {
    backgroundColor: PLOT_COLORS.backgroundColor,
  },
  selected: {
    opacity: 1,
  },
  notSelected:  {
    opacity: 0.25,
  },
})

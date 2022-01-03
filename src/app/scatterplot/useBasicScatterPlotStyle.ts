import { makeStyles } from '@material-ui/core/styles'
import { PLOTS } from '../styles/plots'

export const useBasicScatterPlotStyle = makeStyles({
  svg: {
    backgroundColor: PLOTS.backgroundColor,
  },
  selected: {
    opacity: 1,
  },
})

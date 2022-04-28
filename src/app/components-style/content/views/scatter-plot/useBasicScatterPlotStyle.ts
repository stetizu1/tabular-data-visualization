import { makeStyles } from '@mui/styles'

import { PLOT_COLORS } from '../../../../styles/colors'

export const useBasicScatterPlotStyle = makeStyles({
  svg: {
    background: PLOT_COLORS.backgroundColor,
  },
  selected: {
    opacity: 1,
  },
  notSelected: {
    opacity: 0.25,
  },
})

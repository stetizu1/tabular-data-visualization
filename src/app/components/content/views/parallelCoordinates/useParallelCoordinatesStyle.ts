import { makeStyles } from '@mui/styles'

import { PLOT_COLORS } from '../../../../styles/colors'

export const useParallelCoordinatesStyle = makeStyles({
  svg: {
    font: `12px sans-serif`,
    backgroundColor: PLOT_COLORS.backgroundColor,
  },
  line: {},
  selected: {
    stroke: `#830606 !important`,
  },
  hidden: {
    strokeOpacity: 0.2,
  },
})

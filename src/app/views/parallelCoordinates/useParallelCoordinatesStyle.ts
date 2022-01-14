import { makeStyles } from '@material-ui/core/styles'
import { PLOTS } from '../../styles/plots'

export const useParallelCoordinatesStyle = makeStyles({
  svg: {
    font: `12px sans-serif`,
    padding: `10px`,
    backgroundColor: PLOTS.backgroundColor,
  },
  line: {},
  selected: {
    stroke: `#830606 !important`,
  },
  hidden: {
    strokeOpacity: 0.3,
  },
})

import { makeStyles } from '@material-ui/core/styles'
import { PLOT_COLORS } from '../../../../styles/colors'

export const useGlyphsStyle = makeStyles({
  svg: {
    font: `12px sans-serif`,
    padding: `10px`,
    backgroundColor: PLOT_COLORS.backgroundColor,
  },
  glyph: {
    opacity: 0.5,
  },
  selected: {
    fill: `#830606 !important`,
    opacity: 0.9,
  },
  hidden: {
    fillOpacity: 0.3,
  },
})

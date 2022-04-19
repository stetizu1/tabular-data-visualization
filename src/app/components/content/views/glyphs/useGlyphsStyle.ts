import { makeStyles } from '@mui/styles'
import { PLOT_COLORS } from '../../../../styles/colors'

export const useGlyphsStyle = makeStyles({
  svg: {
    font: `12px sans-serif`,
    backgroundColor: PLOT_COLORS.backgroundColor,
  },
  glyph: {
    opacity: 0.6,
  },
  selected: {
    fill: `#830606 !important`,
    opacity: 0.9,
  },
  hidden: {
    fillOpacity: 0.3,
  },
})

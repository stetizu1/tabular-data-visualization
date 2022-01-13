import { makeStyles } from '@material-ui/core/styles'
import { PLOTS } from '../styles/plots'

export const useGlyphsStyle = makeStyles({
  svg: {
    font: `12px sans-serif`,
    padding: `10px`,
    backgroundColor: PLOTS.backgroundColor,
  },
  glyph: {
    opacity: 0.5,
  },
  selected: {
    fill: `#830606 !important`,
  },
  hidden: {
    fillOpacity: 0.3,
  },
})

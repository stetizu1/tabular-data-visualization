import { SxProps } from '@mui/system'

import { Opacity } from '../../../../types/styling/Opacity'

import { important } from '../../../../helpers/d3/stringGetters'
import { PLOT_COLORS } from '../../../../styles/colors'

export const GLYPHS_CLASS = `glyphs`
export const SELECTED_CLASS = `glyphsSelected`

export const getGlyphsStyle = (opacity: Opacity, isBrushActive: boolean): SxProps => ({
  '& svg': {
    bgcolor: PLOT_COLORS.backgroundColor,
    font: `12px sans-serif`,
  },
  '& .glyphs': {
    opacity: !isBrushActive ? opacity[0] / 100 : opacity[2] / 100,
    cursor: `pointer`,
    '&.glyphsSelected': {
      fill: important(PLOT_COLORS.brushColor),
      opacity: opacity[1] / 100,
    },
  },
})

import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

import { Margin } from '../../../../types/styling/Margin'
import { Opacity } from '../../../../types/styling/Opacity'

import { Dimensions } from '../../../../types/basic/dimensions'

import { important } from '../../../../helpers/d3/stringGetters'

import { PLOT_COLORS } from '../../../../styles/colors'
import { PLOT_FONT } from '../../../../styles/font'

interface StyleProps extends Dimensions {
  margin: Margin
  opacity: Opacity
}

export const useGlyphsStyle = makeStyles<Theme, StyleProps>(() => ({
  svg: {
    fontSize: PLOT_FONT.fontSize,
    background: PLOT_COLORS.backgroundColor,
  },
  glyph: {
    opacity: ({ opacity }) => opacity[0] / 100,
  },
  selected: {
    fill: important(PLOT_COLORS.brushColor),
    opacity: ({ opacity }) => opacity[1] / 100,
  },
  hidden: {
    fillOpacity: ({ opacity }) => opacity[2] / 100,
  },
  notDisplayed: {
    width: ({ width, margin }) => width - margin.width,
    height: ({ height, margin }) => height - margin.height,
    padding: ({ margin }) => margin.toString,
  },
}))

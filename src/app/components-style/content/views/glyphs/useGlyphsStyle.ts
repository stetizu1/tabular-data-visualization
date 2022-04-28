import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

import { Margin } from '../../../../types/styling/Margin'
import { Dimensions } from '../../../../types/basic/dimensions'

import { important } from '../../../../helpers/d3/stringGetters'

import { PLOT_COLORS } from '../../../../styles/colors'
import { PLOT_FONT } from '../../../../styles/font'

interface StyleProps extends Dimensions {
  margin: Margin
}

export const useGlyphsStyle = makeStyles<Theme, StyleProps>(() => ({
  svg: {
    fontSize: PLOT_FONT.fontSize,
    background: PLOT_COLORS.backgroundColor,
  },
  glyph: {
    opacity: 0.6,
  },
  selected: {
    fill: important(PLOT_COLORS.brushColor),
    opacity: 0.9,
  },
  hidden: {
    fillOpacity: 0.3,
  },
  notDisplayed: {
    width: ({ width, margin }) => width - margin.width,
    height: ({ height, margin }) => height - margin.height,
    padding: ({ margin }) => margin.toString,
  },
}))

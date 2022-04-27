import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

import { Margin } from '../../../../types/styling/Margin'
import { Dimensions } from '../../../../types/basic/dimensions'

import { important, px } from '../../../../helpers/d3/stringGetters'

import { PLOT_COLORS } from '../../../../styles/colors'

interface StyleProps extends Dimensions {
  margin: Margin
}

export const useGlyphsStyle = makeStyles<Theme, StyleProps>(() => ({
  svg: {
    fontSize: px(12),
    backgroundColor: PLOT_COLORS.backgroundColor,
  },
  glyph: {
    opacity: 0.6,
  },
  selected: {
    fill: important(`#830606`),
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

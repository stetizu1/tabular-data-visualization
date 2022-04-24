import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

import { Margin } from '../../../../types/styling/Margin'

import { PLOT_COLORS } from '../../../../styles/colors'

export interface StyleProps {
  width: number
  height: number
  margin: Margin
}

export const useGlyphsStyle = makeStyles<Theme, StyleProps>(() => ({
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
  notDisplayed: {
    width: ({ width, margin }) => width - margin.width,
    height: ({ height, margin }) => height - margin.height,
    padding: ({ margin }) => `${margin.top}px ${margin.right}px ${margin.bottom}px ${margin.left}px`,
  },
}))

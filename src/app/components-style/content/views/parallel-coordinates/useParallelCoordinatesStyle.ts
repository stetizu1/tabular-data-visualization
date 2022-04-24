import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

import { Margin } from '../../../../types/styling/Margin'

import { PLOT_COLORS } from '../../../../styles/colors'

export interface StyleProps {
  width: number
  height: number
  margin: Margin
}

export const useParallelCoordinatesStyle = makeStyles<Theme, StyleProps>(() => ({
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
  notDisplayed: {
    width: ({ width, margin }) => width - margin.width,
    height: ({ height, margin }) => height - margin.height,
    padding: ({ margin }) => `${margin.top}px ${margin.right}px ${margin.bottom}px ${margin.left}px`,
  },
}))

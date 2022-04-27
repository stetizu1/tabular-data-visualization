import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

import { Margin } from '../../../../types/styling/Margin'
import { Dimensions } from '../../../../types/basic/dimensions'

import { PLOT_COLORS } from '../../../../styles/colors'
import { PLOT_FONT } from '../../../../styles/font'

export interface StyleProps extends Dimensions {
  margin: Margin
}

export const useParallelCoordinatesStyle = makeStyles<Theme, StyleProps>(() => ({
  svg: {
    font: `12px sans-serif`,
    backgroundColor: PLOT_COLORS.backgroundColor,
  },
  line: {
    fill: `none`,
    opacity: 0.5,
  },
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
  text: {
    textAnchor: `middle`,
    fill: PLOT_COLORS.fontColor,
    fontSize: PLOT_FONT.fontSize,
  },
}))

import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

import { Margin } from '../../../../types/styling/Margin'
import { Opacity } from '../../../../types/styling/Opacity'
import { Dimensions } from '../../../../types/basic/dimensions'

import { important } from '../../../../helpers/d3/stringGetters'

import { ViewType } from '../../../../constants/views/ViewTypes'

import { PLOT_COLORS } from '../../../../styles/colors'
import { PLOT_FONT } from '../../../../styles/font'

export interface StyleProps extends Dimensions {
  margin: Margin
  opacity: Opacity
}

export const useParallelCoordinatesStyle = makeStyles<Theme, StyleProps>(() => ({
  // needed for identification while saving
  [ViewType.ParallelCoordinates]: {
    background: PLOT_COLORS.backgroundColor,
    font: `12px sans-serif`,
  },
  line: {
    fill: `none`,
    opacity: ({ opacity }) => opacity[0] / 100,
  },
  selected: {
    stroke: important(PLOT_COLORS.brushColor),
    opacity: ({ opacity }) => opacity[1] / 100,
  },
  hidden: {
    strokeOpacity: ({ opacity }) => opacity[2] / 100,
  },
  notDisplayed: {
    width: ({ width, margin }) => width - margin.width,
    height: ({ height, margin }) => height - margin.height,
    padding: ({ margin }) => margin.toString,
  },
  text: {
    textAnchor: `middle`,
    fontWeight: `bold`,
    fill: PLOT_COLORS.fontColor,
    fontSize: PLOT_FONT.fontSize,
  },
}))

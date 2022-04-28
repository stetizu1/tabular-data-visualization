import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

import { Margin } from '../../../../types/styling/Margin'
import { Dimensions } from '../../../../types/basic/dimensions'

import { important } from '../../../../helpers/d3/stringGetters'

import { PLOT_COLORS } from '../../../../styles/colors'
import { PLOT_FONT } from '../../../../styles/font'

export interface StyleProps extends Dimensions {
  margin: Margin
}

export const useScatterPlotMatrixStyle = makeStyles<Theme, StyleProps>(() => ({
  x: {},
  y: {},
  svg: {
    fontSize: PLOT_FONT.fontSize,
    background: PLOT_COLORS.backgroundColor,
  },
  axis: {
    shapeRendering: `crispEdges`,
    '& line': {
      stroke: PLOT_COLORS.axisLines,
    },
    '& path': {
      display: `none`,
    },
  },
  rect: {
    shapeRendering: `crispEdges`,
    fill: `none`,
    stroke: PLOT_COLORS.dataBox,
  },
  axisLine: {
    stroke: PLOT_COLORS.axisLines,
  },
  axisPath: {
    display: `none`,
  },
  cell: {
    '& text': {
      fontWeight: `bold`,
      fill: `black`,
    },
  },
  dataPoint: {
    fillOpacity: 0.7,
  },
  selected: {
    fill: important(PLOT_COLORS.brushColor),
  },
  hidden: {
    fillOpacity: 0.15,
  },
  notDisplayed: {
    width: ({ width, margin }) => width - margin.width,
    height: ({ height, margin }) => height - margin.height,
    padding: ({ margin }) => margin.toString,
  },
  duplicates: {},
}))

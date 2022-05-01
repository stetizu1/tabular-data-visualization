import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

import { Margin } from '../../../../types/styling/Margin'
import { Opacity } from '../../../../types/styling/Opacity'
import { Dimensions } from '../../../../types/basic/dimensions'

import { important } from '../../../../helpers/d3/stringGetters'

import { PLOT_COLORS } from '../../../../styles/colors'
import { PLOT_FONT } from '../../../../styles/font'

export interface StyleProps extends Dimensions {
  margin: Margin
  opacity: Opacity
}

export const useScatterPlotMatrixStyle = makeStyles<Theme, StyleProps>(() => ({
  svg: {
    fontSize: PLOT_FONT.fontSize,
    background: PLOT_COLORS.backgroundColor,
    font: `12px sans-serif`,
  },
  x: {},
  y: {},
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
    fillOpacity: ({ opacity }) => opacity[0] / 100,
  },
  selected: {
    fill: important(PLOT_COLORS.brushColor),
    fillOpacity: ({ opacity }) => opacity[1] / 100,
  },
  hidden: {
    fillOpacity: ({ opacity }) => opacity[2] / 100,
  },
  notDisplayed: {
    width: ({ width, margin }) => width - margin.width,
    height: ({ height, margin }) => height - margin.height,
    padding: ({ margin }) => margin.toString,
  },
  duplicates: {},
}))

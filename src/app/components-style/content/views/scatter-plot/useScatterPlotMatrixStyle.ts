import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

import { Margin } from '../../../../types/styling/Margin'
import { Dimensions } from '../../../../types/basic/dimensions'

import { important, px } from '../../../../helpers/d3/stringGetters'

import { PLOT_COLORS } from '../../../../styles/colors'

export interface StyleProps extends Dimensions {
  margin: Margin
}

export const useScatterPlotMatrixStyle = makeStyles<Theme, StyleProps>(() => ({
  x: {},
  y: {},
  svg: {
    fontSize: px(12),
    backgroundColor: PLOT_COLORS.backgroundColor,
  },
  axis: {
    shapeRendering: `crispEdges`,
    '& line': {
      stroke: `#ddd`,
    },
    '& path': {
      display: `none`,
    },
  },
  rect: {
    shapeRendering: `crispEdges`,
    fill: `none`,
    stroke: `#aaa`,
  },
  axisLine: {
    stroke: `#ddd`,
  },
  axisPath: {
    display: `none`,
  },
  cell: {
    '& text': {
      fontWeight: `bold`,
      textTransform: `capitalize`,
      fill: `black`,
    },
  },
  dataPoint: {
    fillOpacity: 0.7,
    '&.hidden': {
      fill: `#ccc`,
    },
  },
  selected: {
    fill: important(`#830606`),
  },
  hidden: {
    fillOpacity: 0.15,
  },
  notDisplayed: {
    width: ({ width, margin }) => width - margin.width,
    height: ({ height, margin }) => height - margin.height,
    padding: ({ margin }) => margin.toString,
  },
}))

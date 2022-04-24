import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

import { Margin } from '../../../../types/styling/Margin'

import { PLOT_COLORS } from '../../../../styles/colors'

export interface StyleProps {
  width: number
  height: number
  margin: Margin
}

export const useScatterPlotMatrixStyle = makeStyles<Theme, StyleProps>(() => ({
  x: {},
  y: {},
  svg: {
    font: `12px sans-serif`,
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
  frame: {
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
    fill: `#830606 !important`,
  },
  hidden: {
    fillOpacity: 0.15,
  },
  notDisplayed: {
    width: ({ width, margin }) => width - margin.width,
    height: ({ height, margin }) => height - margin.height,
    padding: ({ margin }) => `${margin.top}px ${margin.right}px ${margin.bottom}px ${margin.left}px`,
  },
}))

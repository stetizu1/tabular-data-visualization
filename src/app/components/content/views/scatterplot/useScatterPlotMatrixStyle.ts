import { makeStyles } from '@mui/styles'
import { PLOT_COLORS } from '../../../../styles/colors'

export const useScatterPlotMatrixStyle = makeStyles({
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
  circle: {
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
})

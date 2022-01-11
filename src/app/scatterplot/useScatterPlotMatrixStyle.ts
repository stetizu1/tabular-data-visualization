import { makeStyles } from '@material-ui/core/styles'
import { PLOTS } from '../styles/plots'

export const useScatterPlotMatrixStyle = makeStyles({
  x: {},
  y: {},
  svg: {
    font: `12px sans-serif`,
    padding: `10px`,
    backgroundColor: PLOTS.backgroundColor,
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
    fillOpacity: .7,
    '&.hidden': {
      fill: `#ccc`,
    },
  },
})

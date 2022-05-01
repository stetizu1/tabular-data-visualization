import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

import { Margin } from '../../../../types/styling/Margin'
import { Opacity } from '../../../../types/styling/Opacity'

import { Dimensions } from '../../../../types/basic/dimensions'

import { important } from '../../../../helpers/d3/stringGetters'

import { PLOT_COLORS } from '../../../../styles/colors'
import { ViewType } from '../../../../constants/views/ViewTypes'

interface StyleProps extends Dimensions {
  margin: Margin
  opacity: Opacity
}

export const useScatterPlotGlyphsStyle = makeStyles<Theme, StyleProps>(() => ({
  // needed for identification while saving
  [ViewType.ScatterPlotGlyphs]: {
    background: PLOT_COLORS.backgroundColor,
    font: `12px sans-serif`,
  },
  glyph: {
    opacity: ({ opacity }) => opacity[0] / 100,
  },
  axis: {
    shapeRendering: `crispEdges`,
    '& line, path': {
      stroke: important(PLOT_COLORS.axisLinesDark),
    },
  },
  selected: {
    fill: important(PLOT_COLORS.brushColor),
    opacity: ({ opacity }) => opacity[1] / 100,
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

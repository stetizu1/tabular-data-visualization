import { SxProps } from '@mui/system'
import { Opacity } from '../../../../types/styling/Opacity'

import { important } from '../../../../helpers/d3/stringGetters'
import { PLOT_COLORS } from '../../../../styles/colors'

export const SCATTER_PLOT_GLYPHS_CLASS = `scatterPlotGlyphs`
export const SELECTED_CLASS = `scatterPlotGlyphsSelected`
export const AXIS_CLASS = `scatterPlotAxis`
export const DUPLICATES_CLASS = `scatterPlotGlyphsDuplicates`

export const getScatterPlotGlyphsStyle = (opacity: Opacity, isBrushingActive: boolean): SxProps => ({
  '& svg': {
    background: PLOT_COLORS.backgroundColor,
    font: `12px sans-serif`,
  },
  '& .scatterPlotGlyphs': {
    opacity: !isBrushingActive ? opacity[0] / 100 : opacity[2] / 100,
    '&.scatterPlotGlyphsSelected': {
      fill: important(PLOT_COLORS.brushColor),
      opacity: opacity[1] / 100,
    },
  },
  '& .scatterPlotGlyphsDuplicates': {
    opacity: 0,
  },
  '& .scatterPlotAxis': {
    shapeRendering: `crispEdges`,
    '& line, path': {
      stroke: important(PLOT_COLORS.axisLinesDark),
    },
  },
})

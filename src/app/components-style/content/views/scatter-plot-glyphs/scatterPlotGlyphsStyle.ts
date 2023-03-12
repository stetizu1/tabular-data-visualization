import { Opacity } from '@/types/styling/Opacity'
import { SxProps } from '@mui/system'

import { important, px } from '@/helpers/stringGetters'

import { PLOT_COLORS } from '@/styles/colors'

export const SCATTER_PLOT_GLYPHS_CLASS = `scatterPlotGlyphs`
export const SELECTED_CLASS = `scatterPlotGlyphsSelected`
export const AXIS_CLASS = `scatterPlotGlyphsAxis`
export const AXIS_TEXT_CLASS = `scatterPlotGlyphsAxisText`
export const DUPLICATES_CLASS = `scatterPlotGlyphsDuplicates`

// all styles need to be in one sxProps for the view saving with css
export const getScatterPlotGlyphsStyle = (
  opacity: Opacity,
  isBrushingActive: boolean,
  brushColor: string,
): SxProps => ({
  '& svg': {
    bgcolor: PLOT_COLORS.backgroundColor,
    font: `12px sans-serif`,
  },
  '& .scatterPlotGlyphs': {
    opacity: !isBrushingActive ? opacity[0] / 100 : opacity[2] / 100,
    '&.scatterPlotGlyphsSelected': {
      fill: important(brushColor),
      opacity: opacity[1] / 100,
    },
  },
  '& .scatterPlotGlyphsDuplicates': {
    opacity: 0,
  },
  '& .scatterPlotGlyphsAxis': {
    shapeRendering: `crispEdges`,
    '& line, path': {
      stroke: PLOT_COLORS.axisLinesDark,
    },
  },
  '& .scatterPlotGlyphsAxisText': {
    fill: PLOT_COLORS.fontColor,
    fontSize: px(13),
    fontWeight: `bold`,
  },
})

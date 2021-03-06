import { SxProps } from '@mui/system'

import { Opacity } from '../../../../types/styling/Opacity'

import { important } from '../../../../helpers/stringGetters'

import { PLOT_COLORS } from '../../../../styles/colors'

export const DATA_POINT_CLASS = `scatterPlotMatrixPoint`
export const DUPLICATES_CLASS = `scatterPlotMatrixDuplicates`
export const AXIS_CLASS = `scatterPlotMatrixAxis`
export const RECT_CLASS = `scatterPlotMatrixRect`
export const CELL_CLASS = `scatterPlotMatrixCell`
export const SELECTED_CLASS = `scatterPlotMatrixSelected`

// all styles need to be in one sxProps for the view saving with css
export const getScatterPlotMatrixStyle = (
  opacity: Opacity,
  isBrushingActive: boolean,
  brushColor: string,
): SxProps => ({
  '& svg': {
    bgcolor: PLOT_COLORS.backgroundColor,
    font: `12px sans-serif`,
  },
  '& .scatterPlotMatrixAxis': {
    shapeRendering: `crispEdges`,
    '& line': {
      stroke: PLOT_COLORS.axisLines,
    },
    '& path': {
      display: `none`,
    },
  },
  '& .scatterPlotMatrixRect': {
    shapeRendering: `crispEdges`,
    fill: `none`,
    stroke: PLOT_COLORS.dataBox,
  },
  '& .scatterPlotMatrixCell': {
    '& text': {
      fontWeight: `bold`,
      fill: `black`,
    },
  },
  '& .scatterPlotMatrixPoint': {
    fillOpacity: !isBrushingActive ? opacity[0] / 100 : opacity[2] / 100,
    '&.scatterPlotMatrixSelected': {
      fill: important(brushColor),
      fillOpacity: opacity[1] / 100,
    },
  },
  '& .scatterPlotMatrixDuplicates': {
    opacity: 0,
  },
})

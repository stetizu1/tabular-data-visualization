import { SxProps } from '@mui/system'

import { Opacity } from '../../../../types/styling/Opacity'

import { important } from '../../../../helpers/d3/stringGetters'

import { PLOT_COLORS } from '../../../../styles/colors'
import { PLOT_FONT } from '../../../../styles/font'

export const PARALLEL_COORDINATES_CLASS = `parallelCoordinates`
export const SELECTED_CLASS = `parallelCoordinatesSelected`
export const AXES_TEXT_CLASS = `parallelCoordinatesAxesText`

export const getParallelCoordinatesStyle = (opacity: Opacity, isBrushActive: boolean): SxProps => ({
  '& svg': {
    bgcolor: PLOT_COLORS.backgroundColor,
    font: `12px sans-serif`,
  },
  '& path': {
    fill: `none`,
    opacity: !isBrushActive ? opacity[0] / 100 : opacity[2] / 100,
    '&.parallelCoordinatesSelected': {
      opacity: opacity[1] / 100,
      stroke: important(PLOT_COLORS.brushColor),
    },
  },
  '& .parallelCoordinatesAxesText': {
    textAnchor: `middle`,
    fontWeight: `bold`,
    fill: PLOT_COLORS.fontColor,
    fontSize: PLOT_FONT.fontSize,
  },
})

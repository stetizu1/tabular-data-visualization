import { SxProps } from '@mui/system'

import { Opacity } from '@/types/styling/Opacity'

import { important, px } from '@/helpers/stringGetters'

import { PLOT_COLORS } from '@/styles/colors'

export const PARALLEL_COORDINATES_CLASS = `parallelCoordinates`
export const SELECTED_CLASS = `parallelCoordinatesSelected`
export const AXES_TEXT_CLASS = `parallelCoordinatesAxesText`

// all styles need to be in one sxProps for the view saving with css
export const getParallelCoordinatesStyle = (opacity: Opacity, isBrushActive: boolean, brushColor: string): SxProps => ({
  '& svg': {
    bgcolor: PLOT_COLORS.backgroundColor,
    font: `12px sans-serif`,
  },
  '& path': {
    fill: `none`,
    opacity: !isBrushActive ? opacity[0] / 100 : opacity[2] / 100,
    '&.parallelCoordinatesSelected': {
      opacity: opacity[1] / 100,
      stroke: important(brushColor),
    },
  },
  '& .parallelCoordinatesAxesText': {
    textAnchor: `middle`,
    fontWeight: `bold`,
    fill: PLOT_COLORS.fontColor,
    fontSize: px(12),
  },
})

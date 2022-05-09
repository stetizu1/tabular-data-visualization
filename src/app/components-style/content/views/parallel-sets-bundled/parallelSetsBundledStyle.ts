import { SxProps } from '@mui/system'

import { Opacity } from '../../../../types/styling/Opacity'

import { PLOT_COLORS } from '../../../../styles/colors'
import { important } from '../../../../helpers/d3/stringGetters'

export const SELECTED_CLASS = `parallelSetsBundledSelected`
export const TABS_CLASS = `psbTabs`
export const LINE_NOT_SELECTED_CLASS = `psbLine`

export const getParallelSetsBundledStyle = (opacity: Opacity, isBrushActive: boolean, brushColor: string): SxProps => ({
  '& svg': {
    bgcolor: PLOT_COLORS.backgroundColor,
    font: `12px sans-serif`,
  },
  '& path': {
    '&.parallelSetsBundledSelected': {
      opacity: opacity[1] / 100,
      stroke: important(brushColor),
    },
    '&.psbLine': {
      opacity: !isBrushActive ? opacity[0] / 100 : opacity[2] / 100,
    },
  },
})

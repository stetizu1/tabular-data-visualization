import { SxProps } from '@mui/system'

import { Opacity } from '../../../../types/styling/Opacity'

import { PLOT_COLORS } from '../../../../styles/colors'

export const getParallelSetsBundledStyle = (opacity: Opacity, isBrushActive: boolean, brushColor: string): SxProps => ({
  '& svg': {
    bgcolor: PLOT_COLORS.backgroundColor,
    font: `12px sans-serif`,
  },
})

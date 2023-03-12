import { SxProps } from '@mui/system'

import { px } from '@/helpers/stringGetters'

import { PLOT_COLORS } from '@/styles/colors'

export const viewGridStyle: Record<string, SxProps> = {
  tooltip: {
    position: `fixed`,
    padding: px(5, 5, 10),
    bgcolor: PLOT_COLORS.tooltipBackground,
    color: PLOT_COLORS.tooltipFont,
    borderRadius: px(5),
    pointerEvents: `none`,
    opacity: 0,
    zIndex: 10,
  },
}

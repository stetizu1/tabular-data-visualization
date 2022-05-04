import { SxProps } from '@mui/system'
import { px } from '../../../helpers/d3/stringGetters'
import { TOOLTIP } from '../../../constants/views/tooltip'
import { PLOT_COLORS } from '../../../styles/colors'

export const viewGridStyle: Record<string, SxProps> = {
  tooltip: {
    position: `fixed`,
    padding: px(TOOLTIP.padding.top, TOOLTIP.padding.lr, TOOLTIP.padding.bottom),
    bgcolor: PLOT_COLORS.tooltipBackground,
    color: PLOT_COLORS.tooltipFont,
    borderRadius: px(5),
    pointerEvents: `none`,
    opacity: 0,
    zIndex: 10,
  },
}

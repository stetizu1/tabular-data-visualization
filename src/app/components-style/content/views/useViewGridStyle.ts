import { makeStyles } from '@mui/styles'
import { px } from '../../../helpers/d3/stringGetters'
import { TOOLTIP } from '../../../constants/views/tooltip'
import { PLOT_COLORS } from '../../../styles/colors'

export const useViewGridStyle = makeStyles({
  tooltip: {
    position: `fixed`,
    padding: px(TOOLTIP.padding.top, TOOLTIP.padding.lr, TOOLTIP.padding.bottom),
    background: PLOT_COLORS.tooltipBackground,
    color: PLOT_COLORS.tooltipFont,
    borderRadius: px(5),
    pointerEvents: `none`,
    opacity: 0,
    zIndex: 10,
  },
})

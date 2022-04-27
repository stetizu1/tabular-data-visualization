import { makeStyles } from '@mui/styles'

import { px } from '../../../helpers/d3/stringGetters'

import { TOOLTIP } from '../../../constants/views/tooltip'

import { PLOT_COLORS } from '../../../styles/colors'

export const useTooltipStyle = makeStyles({
  tooltip: {
    position: `fixed`,
    padding: px(TOOLTIP.PADDING.TOP, TOOLTIP.PADDING.LR, TOOLTIP.PADDING.BOTTOM),
    background: PLOT_COLORS.tooltipBackground,
    color: PLOT_COLORS.tooltipFont,
    borderRadius: px(5),
    pointerEvents: `none`,
    opacity: 0,
  },
})

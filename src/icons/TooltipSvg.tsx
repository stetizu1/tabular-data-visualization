/**
 * Graph tooltip icon
 */
import { forwardRef } from 'react'
import { Box } from '@mui/material'

export const TooltipSvg = forwardRef((props, ref) => (
  <Box ref={ref} style={{ height: 24 }} {...props}>
    <svg
      className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium"
      style={{
        userSelect: `none`,
        width: `1em`,
        height: `1em`,
        display: `inline-block`,
        fill: `currentColor`,
        flexShrink: 0,
        fontSize: `1.5rem`,
      }}
      aria-hidden="true"
      viewBox="0 0 24 24"
    >
      <path
        id="path2-2"
        style={{ strokeWidth: 1 }}
        d="m 2.0292969,2.6826315 0.039063,15.5214845 c 0,1.091591 0.8902343,1.984375 1.9902344,1.984375 H 20.058594 c 1.1,0 2,-0.892784 2,-1.984375 V 6.2959128 c 0,-1.0915916 -0.900007,-1.988315 -2,-1.984375 L 3.7167969,4.3701315 Z M 5.1757812,8.3642721 H 12.84375 V 9.4170065 H 5.1757812 Z m 0,2.4999999 H 18.375 v 1.052734 H 5.1757812 Z m 0.1171876,2.5 h 8.8671872 v 1.052735 H 5.2929688 Z m -0.015625,2.5 H 17.130859 v 1.052735 H 5.2773438 Z"
      />
    </svg>
  </Box>
))

TooltipSvg.displayName = `TooltipSvg`

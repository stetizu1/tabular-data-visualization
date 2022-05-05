import { VoidFunctionComponent } from 'react'
import { Box, Tooltip } from '@mui/material'

import {
  colorInputStyle,
  getColorInputBoxStyle,
  getColorInputStyle,
} from '../../../../../components-style/content/top-toolbar/items/buttons/colorButtonStyle'

export interface ColorButtonProps {
  color: string
  handleSetColor: (color: string) => void
  tooltip: string
  disabled?: boolean
  icon: JSX.Element
}

export const ColorButton: VoidFunctionComponent<ColorButtonProps> = ({
  color,
  handleSetColor,
  tooltip,
  disabled,
  icon,
}) => (
  <Tooltip title={tooltip} disableHoverListener={disabled}>
    <Box sx={colorInputStyle.inputBox}>
      <input disabled={disabled} type="color" value={color} onChange={(e) => handleSetColor(e.target.value)} />
      <Box sx={getColorInputStyle(disabled)}>
        {icon}
        <Box sx={getColorInputBoxStyle(color, disabled)} />
      </Box>
    </Box>
  </Tooltip>
)

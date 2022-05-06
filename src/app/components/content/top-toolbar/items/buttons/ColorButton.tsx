import { useEffect, useState, VoidFunctionComponent } from 'react'
import { Box, Tooltip } from '@mui/material'

import {
  colorInputStyle,
  getColorInputBoxStyle,
  getColorInputStyle,
} from '../../../../../components-style/content/top-toolbar/items/buttons/colorButtonStyle'
import { useDebounce } from '../../../../../helpers/react/useDebounce'

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
}) => {
  const [currentColor, setCurrentColor] = useState(color)
  const debouncedColor = useDebounce(currentColor, 60)
  useEffect(() => {
    handleSetColor(debouncedColor)
  }, [debouncedColor, handleSetColor])

  return (
    <Tooltip title={tooltip} disableHoverListener={disabled}>
      <Box sx={colorInputStyle.inputBox}>
        <input disabled={disabled} type="color" value={color} onChange={(e) => setCurrentColor(e.target.value)} />
        <Box sx={getColorInputStyle(disabled)}>
          {icon}
          <Box sx={getColorInputBoxStyle(color, disabled)} />
        </Box>
      </Box>
    </Tooltip>
  )
}

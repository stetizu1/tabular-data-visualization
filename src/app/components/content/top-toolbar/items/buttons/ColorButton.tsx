/**
 * Button for color change
 */
import { Box, Tooltip } from '@mui/material'
import { FC, useEffect, useState } from 'react'

import { useDebounce } from '@/helpers/react/useDebounce'

import { COLOR_DEBOUNCE } from '@/constants/debounce/debounce'
import { INPUT_TYPE } from '@/constants/others'

import {
  colorInputStyle,
  getColorInputBoxStyle,
  getColorInputStyle,
} from '@/components-style/content/top-toolbar/items/buttons/colorButtonStyle'

export interface ColorButtonProps {
  color: string
  handleSetColor: (color: string) => void
  tooltip: string
  disabled?: boolean
  icon: JSX.Element
}

export const ColorButton: FC<ColorButtonProps> = ({ color, handleSetColor, tooltip, disabled, icon }) => {
  const [currentColor, setCurrentColor] = useState(color)
  const debouncedColor = useDebounce(currentColor, COLOR_DEBOUNCE)
  useEffect(() => {
    handleSetColor(debouncedColor)
  }, [debouncedColor, handleSetColor])

  return (
    <Tooltip title={tooltip} disableHoverListener={disabled}>
      <Box sx={colorInputStyle.inputBox}>
        <input
          disabled={disabled}
          type={INPUT_TYPE.color}
          value={color}
          onChange={(e) => setCurrentColor(e.target.value)}
        />
        <Box sx={getColorInputStyle(disabled)}>
          {icon}
          <Box sx={getColorInputBoxStyle(color, disabled)} />
        </Box>
      </Box>
    </Tooltip>
  )
}

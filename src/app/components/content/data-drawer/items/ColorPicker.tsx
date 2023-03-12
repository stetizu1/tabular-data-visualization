/**
 * A component to choose a single color.
 */
import { Box, Typography } from '@mui/material'
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'

import { Settings } from '@/types/views/settings/Settings'

import { useDebounce } from '@/helpers/react/useDebounce'

import { COLOR_DEBOUNCE } from '@/constants/debounce/debounce'
import { INPUT_TYPE } from '@/constants/others'
import { ViewType } from '@/constants/views-general/ViewType'

import {
  colorPickerStyle,
  getColorPickerInputStyle,
} from '@/components-style/content/data-drawer/items/colorPickerStyle'
import { settingsTextStyle } from '@/components-style/content/data-drawer/items/settingsTextStyle'

export interface ColorPickerProps<Opt> {
  viewType: ViewType
  color: string
  settingsKey: keyof Opt
  setSettings: Dispatch<SetStateAction<Settings>>
  label: string
}

export const ColorPicker = <Opt,>({
  viewType,
  color,
  settingsKey,
  setSettings,
  label,
}: ColorPickerProps<Opt>): JSX.Element => {
  const [currentColor, setCurrentColor] = useState(color)
  const debouncedColor = useDebounce(currentColor, COLOR_DEBOUNCE)

  const handleChangeColor = useCallback((newColor: string) => {
    if (newColor) {
      setCurrentColor(newColor)
    }
  }, [])

  useEffect(() => {
    setSettings((prev) => {
      const prevSettings = prev[viewType]!
      return {
        ...prev,
        [viewType]: {
          ...prevSettings,
          [settingsKey]: debouncedColor,
        },
      }
    })
  }, [debouncedColor, setSettings, settingsKey, viewType])
  return (
    <Box sx={colorPickerStyle.picker}>
      <Typography sx={settingsTextStyle.text}>{label}</Typography>
      <Box sx={getColorPickerInputStyle(color)}>
        <input type={INPUT_TYPE.color} value={color} onChange={(e) => handleChangeColor(e.target.value)} />
      </Box>
    </Box>
  )
}

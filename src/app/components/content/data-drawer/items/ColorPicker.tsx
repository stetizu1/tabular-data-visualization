import { Dispatch, SetStateAction } from 'react'
import { Box, Typography } from '@mui/material'

import { ViewType } from '../../../../constants/views/ViewTypes'

import { Settings } from '../../../../types/views/settings/Settings'
import {
  colorPickerStyle,
  getColorPickerInputStyle,
} from '../../../../components-style/content/data-drawer/items/colorPickerStyle'
import { menuTextStyle } from '../../../../components-style/content/data-drawer/items/menuTextStyle'

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
  const handleSetColor = (newColor: string) => {
    if (newColor) {
      setSettings((prev) => {
        const prevSettings = prev[viewType]!
        return {
          ...prev,
          [viewType]: {
            ...prevSettings,
            [settingsKey]: newColor,
          },
        }
      })
    }
  }
  return (
    <Box sx={colorPickerStyle.picker}>
      <Typography sx={menuTextStyle.text}>{label}</Typography>
      <Box sx={getColorPickerInputStyle(color)}>
        <input type="color" value={color} onChange={(e) => handleSetColor(e.target.value)} />
      </Box>
    </Box>
  )
}

import { Dispatch, VoidFunctionComponent, SetStateAction } from 'react'
import { Box, Typography } from '@mui/material'

import { ColorArray } from '../../../../types/styling/ColorArray'

import { ViewType } from '../../../../constants/views/ViewTypes'

import { PALETTE_PICKER_TEXT } from '../../../../text/views-and-menus/common'

import {
  getPalettePickerColorInputStyle,
  palettePickerStyle,
} from '../../../../components-style/content/data-drawer/items/palettePickerStyle'

import { Settings } from '../../../../types/views/settings/Settings'

export interface PalettePickerProps {
  viewType: ViewType
  colors: ColorArray
  setSettings: Dispatch<SetStateAction<Settings>>
}

export const PalettePicker: VoidFunctionComponent<PalettePickerProps> = ({ colors, setSettings, viewType }) => {
  const handleSetColor = (newColor: string, idx: number) => {
    if (newColor) {
      const newColors = [...colors]
      newColors[idx] = newColor
      setSettings((prev) => {
        const prevSettings = prev[viewType]!
        return {
          ...prev,
          [viewType]: {
            ...prevSettings,
            colorCategory: newColors,
          },
        }
      })
    }
  }
  const getInput = (idx: number) => (
    <Box sx={palettePickerStyle.col} key={idx}>
      <label>{PALETTE_PICKER_TEXT.categoriesLabel[idx]}</label>
      <Box sx={getPalettePickerColorInputStyle(colors, idx)}>
        <input type="color" value={colors[idx]} onChange={(e) => handleSetColor(e.target.value, idx)} />
      </Box>
    </Box>
  )
  return (
    <Box sx={palettePickerStyle.picker}>
      <Typography sx={palettePickerStyle.text}>{PALETTE_PICKER_TEXT.header}</Typography>
      <Box sx={palettePickerStyle.row}>{[0, 1, 2, 3, 4].map((idx) => getInput(idx))}</Box>
      <Box sx={palettePickerStyle.row}>{[5, 6, 7, 8, 9].map((idx) => getInput(idx))}</Box>
    </Box>
  )
}

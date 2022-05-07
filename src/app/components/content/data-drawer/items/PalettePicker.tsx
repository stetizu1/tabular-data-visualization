import { Dispatch, VoidFunctionComponent, SetStateAction, useState, useEffect, useCallback } from 'react'
import { Box, Typography } from '@mui/material'

import { ColorArray } from '../../../../types/styling/ColorArray'
import { Settings } from '../../../../types/views/settings/Settings'

import { useDebounce } from '../../../../helpers/react/useDebounce'

import { ViewType } from '../../../../constants/views/ViewTypes'
import { COLOR_DEBOUNCE } from '../../../../constants/debounce/debounce'

import { PALETTE_PICKER_TEXT } from '../../../../text/views-and-menus/common'

import {
  getPalettePickerColorInputStyle,
  palettePickerStyle,
} from '../../../../components-style/content/data-drawer/items/palettePickerStyle'

export interface PalettePickerProps {
  viewType: ViewType
  colors: ColorArray
  setSettings: Dispatch<SetStateAction<Settings>>
  handleChangeSettings?: () => void
}

export const PalettePicker: VoidFunctionComponent<PalettePickerProps> = ({
  colors,
  setSettings,
  viewType,
  handleChangeSettings,
}) => {
  const [currentColors, setCurrentColors] = useState<ColorArray>(colors)
  const debouncedColors = useDebounce(currentColors, COLOR_DEBOUNCE)

  const handleSetColor = useCallback((newColor: string, idx: number) => {
    if (newColor) {
      setCurrentColors((oldColors) => {
        const newColors: ColorArray = [...oldColors]
        newColors[idx] = newColor
        return newColors
      })
    }
  }, [])

  useEffect(() => {
    if (handleChangeSettings) handleChangeSettings()
    setSettings((prev) => {
      const prevSettings = prev[viewType]!
      return {
        ...prev,
        [viewType]: {
          ...prevSettings,
          colorCategory: debouncedColors,
        },
      }
    })
  }, [debouncedColors, setSettings, viewType, handleChangeSettings])

  const getInput = useCallback(
    (idx: number) => (
      <Box sx={palettePickerStyle.col} key={idx}>
        <label>{PALETTE_PICKER_TEXT.categoriesLabel[idx]}</label>
        <Box sx={getPalettePickerColorInputStyle(colors, idx)}>
          <input type="color" value={colors[idx]} onChange={(e) => handleSetColor(e.target.value, idx)} />
        </Box>
      </Box>
    ),
    [colors, handleSetColor],
  )
  return (
    <Box sx={palettePickerStyle.picker}>
      <Typography sx={palettePickerStyle.text}>{PALETTE_PICKER_TEXT.header}</Typography>
      <Box sx={palettePickerStyle.row}>{[0, 1, 2, 3, 4].map((idx) => getInput(idx))}</Box>
      <Box sx={palettePickerStyle.row}>{[5, 6, 7, 8, 9].map((idx) => getInput(idx))}</Box>
    </Box>
  )
}

import { Dispatch, VoidFunctionComponent, SetStateAction } from 'react'
import { Box, TextField, Typography } from '@mui/material'

import { Opacity } from '../../../../types/styling/Opacity'

import { ViewType } from '../../../../constants/views/ViewTypes'

import { OPACITY_MENU_TEXT } from '../../../../text/views-and-menus/common'

import { numberInputStyles } from '../../../../components-style/content/data-drawer/items/numberInputStyles'

import { Settings } from '../../../../types/views/settings/Settings'
import { menuTextStyle } from '../../../../components-style/content/data-drawer/items/menuTextStyle'

export interface OpacityInputProps {
  header: string
  opacity: Opacity
  setSettings: Dispatch<SetStateAction<Settings>>
  viewType: ViewType
}

export const OpacityInput: VoidFunctionComponent<OpacityInputProps> = ({ header, opacity, setSettings, viewType }) => {
  const handleOpacityChange = (newOpacity: number, idx: number) => {
    const newOpacities = [...opacity]
    newOpacities[idx] = newOpacity

    setSettings((prev) => {
      const prevSettings = prev[viewType]!
      return {
        ...prev,
        [viewType]: {
          ...prevSettings,
          opacity: newOpacities,
        },
      }
    })
  }
  return (
    <Box sx={numberInputStyles.vertical}>
      <Typography sx={menuTextStyle.text}>{header}</Typography>
      <TextField
        label={OPACITY_MENU_TEXT.all}
        type="number"
        defaultValue={opacity[0]}
        sx={numberInputStyles.textField}
        inputProps={{ min: 0, max: 100 }}
        onChange={(e) => handleOpacityChange(Number(e.target.value), 0)}
      />
      <Box sx={numberInputStyles.horizontal}>
        <TextField
          label={OPACITY_MENU_TEXT.selected}
          type="number"
          defaultValue={opacity[1]}
          sx={numberInputStyles.textField}
          inputProps={{ min: 0, max: 100 }}
          onChange={(e) => handleOpacityChange(Number(e.target.value), 1)}
        />
        <TextField
          label={OPACITY_MENU_TEXT.notSelected}
          type="number"
          defaultValue={opacity[2]}
          sx={numberInputStyles.textField}
          inputProps={{ min: 0, max: 100 }}
          onChange={(e) => handleOpacityChange(Number(e.target.value), 2)}
        />
      </Box>
    </Box>
  )
}

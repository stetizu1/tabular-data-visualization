import { Dispatch, SetStateAction } from 'react'
import { Box, TextField } from '@mui/material'

import { ViewType } from '../../../../constants/views/ViewTypes'

import { numberInputStyles } from '../../../../components-style/content/data-drawer/items/numberInputStyles'

import { Settings } from '../../../../types/views/settings/Settings'

export interface NumberInputProps<T> {
  label: string
  valueKey: keyof T
  value: number
  setSettings: Dispatch<SetStateAction<Settings>>
  viewType: ViewType
  max?: number
}

export const NumberInput = <T,>({
  label,
  value,
  valueKey,
  setSettings,
  viewType,
  max,
}: NumberInputProps<T>): JSX.Element => {
  const handleValueChange = (newValue: number) => {
    setSettings((prev) => {
      const prevSettings = prev[viewType]!
      return {
        ...prev,
        [viewType]: {
          ...prevSettings,
          [valueKey]: newValue,
        },
      }
    })
  }
  const maxVal = max ? { max } : {}
  return (
    <Box>
      <TextField
        label={label}
        type="number"
        defaultValue={value}
        sx={numberInputStyles.textField}
        inputProps={{ inputMode: `numeric`, min: 0, ...maxVal }}
        onChange={(e) => handleValueChange(Number(e.target.value))}
      />
    </Box>
  )
}

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
  min?: number
  max?: number
  handleChangeSettings?: () => void
}

export const NumberInput = <T,>({
  label,
  value,
  valueKey,
  setSettings,
  viewType,
  min,
  max,
  handleChangeSettings,
}: NumberInputProps<T>): JSX.Element => {
  const handleValueChange = (newValue: number) => {
    if (handleChangeSettings) handleChangeSettings()
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
  const minVal = min ? { min } : { min: 0 }
  const maxVal = max ? { max } : {}
  return (
    <Box>
      <TextField
        label={label}
        type="number"
        defaultValue={value}
        sx={numberInputStyles.textField}
        inputProps={{ inputMode: `numeric`, ...minVal, ...maxVal }}
        onChange={(e) => handleValueChange(Number(e.target.value))}
      />
    </Box>
  )
}

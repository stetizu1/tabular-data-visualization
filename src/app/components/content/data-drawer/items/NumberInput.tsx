import { Dispatch, SetStateAction } from 'react'
import { TextField } from '@mui/material'

import { ViewType } from '../../../../constants/views/ViewTypes'

import { useNumberInputStyles } from '../../../../components-style/content/data-drawer/items/useNumberInputStyles'

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
  const classes = useNumberInputStyles()
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
    <TextField
      label={label}
      type="number"
      defaultValue={value}
      className={classes.textField}
      inputProps={{ inputMode: `numeric`, min: 0, ...maxVal }}
      onChange={(e) => handleValueChange(Number(e.target.value))}
    />
  )
}

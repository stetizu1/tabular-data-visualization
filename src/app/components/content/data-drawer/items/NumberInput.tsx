import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import { Box, TextField } from '@mui/material'

import { ViewType } from '../../../../constants/views/ViewTypes'

import { numberInputStyles } from '../../../../components-style/content/data-drawer/items/numberInputStyles'

import { Settings } from '../../../../types/views/settings/Settings'
import { useDebounce } from '../../../../helpers/react/useDebounce'
import { COLOR_DEBOUNCE } from '../../../../constants/debounce/debounce'

export interface NumberInputProps<Opt> {
  viewType: ViewType
  label: string
  valueKey: keyof Opt
  value: number
  setSettings: Dispatch<SetStateAction<Settings>>
  min?: number
  max?: number
  handleChangeSettings?: () => void
}

export const NumberInput = <Opt,>({
  label,
  value,
  valueKey,
  setSettings,
  viewType,
  min,
  max,
  handleChangeSettings,
}: NumberInputProps<Opt>): JSX.Element => {
  const [currentValue, setCurrentValue] = useState(value)
  const debouncedValue = useDebounce(currentValue, COLOR_DEBOUNCE)

  const handleChangeValue = useCallback((newValue: number) => {
    setCurrentValue(newValue)
  }, [])

  useEffect(() => {
    if (handleChangeSettings) handleChangeSettings()
    setSettings((prev) => {
      const prevSettings = prev[viewType]!
      return {
        ...prev,
        [viewType]: {
          ...prevSettings,
          [valueKey]: debouncedValue,
        },
      }
    })
  }, [debouncedValue, setSettings, valueKey, viewType, handleChangeValue, handleChangeSettings])

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
        onChange={(e) => handleChangeValue(Number(e.target.value))}
      />
    </Box>
  )
}

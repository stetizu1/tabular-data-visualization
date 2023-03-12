/**
 * Number input, works for specified attribute key, allowing to change minimum and maximum.
 */
import { Box, TextField } from '@mui/material'
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'

import { Settings } from '@/types/views/settings/Settings'

import { getInputPropsPositiveNumber } from '@/helpers/basic/getInputPropsPositiveNumber'
import { useDebounce } from '@/helpers/react/useDebounce'

import { TEXT_INPUT_DEBOUNCE } from '@/constants/debounce/debounce'
import { INPUT_TYPE } from '@/constants/others'
import { ViewType } from '@/constants/views-general/ViewType'

import { numberInputStyles } from '@/components-style/content/data-drawer/items/numberInputStyles'

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
  const debouncedValue = useDebounce(currentValue, TEXT_INPUT_DEBOUNCE)

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

  return (
    <Box>
      <TextField
        label={label}
        type={INPUT_TYPE.number}
        defaultValue={value}
        sx={numberInputStyles.textField}
        inputProps={getInputPropsPositiveNumber({ min, max })}
        onChange={(e) => handleChangeValue(Number(e.target.value))}
      />
    </Box>
  )
}

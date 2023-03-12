/**
 * A component to change opacity for all the brushing states.
 */
import { Box, TextField, Typography } from '@mui/material'
import { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from 'react'

import { Opacity } from '@/types/styling/Opacity'
import { Settings } from '@/types/views/settings/Settings'

import { getInputPropsPositiveNumber } from '@/helpers/basic/getInputPropsPositiveNumber'
import { useDebounce } from '@/helpers/react/useDebounce'

import { TEXT_INPUT_DEBOUNCE } from '@/constants/debounce/debounce'
import { INPUT_TYPE } from '@/constants/others'
import { ViewType } from '@/constants/views-general/ViewType'

import { OPACITY_SETTINGS_TEXT } from '@/text/views-and-settings/common'

import { numberInputStyles } from '@/components-style/content/data-drawer/items/numberInputStyles'
import { settingsTextStyle } from '@/components-style/content/data-drawer/items/settingsTextStyle'

export interface OpacityInputProps {
  header: string
  opacities: Opacity
  setSettings: Dispatch<SetStateAction<Settings>>
  viewType: ViewType
}

export const OpacityInput: FC<OpacityInputProps> = ({ header, opacities, setSettings, viewType }) => {
  const [currentOpacities, setCurrentOpacities] = useState<Opacity>(opacities)
  const debouncedOpacities = useDebounce(currentOpacities, TEXT_INPUT_DEBOUNCE)

  const handleOpacityChange = useCallback((newOpacity: number, idx: number) => {
    setCurrentOpacities((oldOpacities) => {
      const newOpacities: Opacity = [...oldOpacities]
      newOpacities[idx] = newOpacity
      return newOpacities
    })
  }, [])

  useEffect(() => {
    setSettings((prev) => {
      const prevSettings = prev[viewType]!
      return {
        ...prev,
        [viewType]: {
          ...prevSettings,
          opacity: debouncedOpacities,
        },
      }
    })
  }, [debouncedOpacities, setSettings, viewType])

  return (
    <Box sx={numberInputStyles.vertical}>
      <Typography sx={settingsTextStyle.text}>{header}</Typography>
      <TextField
        label={OPACITY_SETTINGS_TEXT.all}
        type={INPUT_TYPE.number}
        defaultValue={opacities[0]}
        sx={numberInputStyles.textField}
        inputProps={getInputPropsPositiveNumber({ max: 100 })}
        onChange={(e) => handleOpacityChange(Number(e.target.value), 0)}
      />
      <Box sx={numberInputStyles.horizontal}>
        <TextField
          label={OPACITY_SETTINGS_TEXT.selected}
          type={INPUT_TYPE.number}
          defaultValue={opacities[1]}
          sx={numberInputStyles.textField}
          inputProps={getInputPropsPositiveNumber({ max: 100 })}
          onChange={(e) => handleOpacityChange(Number(e.target.value), 1)}
        />
        <TextField
          label={OPACITY_SETTINGS_TEXT.notSelected}
          type={INPUT_TYPE.number}
          defaultValue={opacities[2]}
          sx={numberInputStyles.textField}
          inputProps={getInputPropsPositiveNumber({ max: 100 })}
          onChange={(e) => handleOpacityChange(Number(e.target.value), 2)}
        />
      </Box>
    </Box>
  )
}

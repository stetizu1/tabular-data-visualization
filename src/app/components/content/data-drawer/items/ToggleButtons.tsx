/**
 * Toggle buttons, works for specified attribute key, forcing to choose between given options.
 */
import { Dispatch, SetStateAction, useCallback } from 'react'
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material'

import { Settings } from '../../../../types/views/settings/Settings'

import { ViewType } from '../../../../constants/views-general/ViewType'

import { toggleButtonsStyle } from '../../../../components-style/content/data-drawer/items/toggleButtonsStyle'

interface ToggleButtonsProps<T, Opt> {
  viewType: ViewType
  value: T
  options: T[]
  setSettings: Dispatch<SetStateAction<Settings>>
  settingsKey: keyof Opt
}

export const ToggleButtons = <T, Opt>({
  viewType,
  value,
  options,
  setSettings,
  settingsKey,
}: ToggleButtonsProps<T, Opt>): JSX.Element => {
  const handleToggleButtonChange = useCallback(
    (newValue: T | null) => {
      setSettings((prev) => {
        const prevSettings = prev[viewType]!
        const newSetting = newValue ? { [settingsKey]: newValue } : {}
        return {
          ...prev,
          [viewType]: {
            ...prevSettings,
            ...newSetting,
          },
        }
      })
    },
    [setSettings, settingsKey, viewType],
  )

  return (
    <Box sx={toggleButtonsStyle.box}>
      <ToggleButtonGroup
        sx={toggleButtonsStyle.group}
        value={value}
        exclusive
        onChange={(e, value) => handleToggleButtonChange(value)}
      >
        {options.map((opt, idx) => (
          <ToggleButton sx={toggleButtonsStyle.button} value={opt} key={idx}>
            {opt}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  )
}

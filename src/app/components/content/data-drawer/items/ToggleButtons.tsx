import { Dispatch, SetStateAction } from 'react'
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material'

import { Settings } from '../../../../types/views/settings/Settings'

import { ViewType } from '../../../../constants/views/ViewTypes'

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
  const handleToggleButtonChange = (newValue: T) => {
    setSettings((prev) => {
      const prevSettings = prev[viewType]!
      return {
        ...prev,
        [viewType]: {
          ...prevSettings,
          [settingsKey]: newValue,
        },
      }
    })
  }
  return (
    <Box>
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

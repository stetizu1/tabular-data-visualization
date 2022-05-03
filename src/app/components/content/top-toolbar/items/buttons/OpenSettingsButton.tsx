import { VoidFunctionComponent } from 'react'
import { Settings } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import clsx from 'clsx'

import { useOpenSettingsButtonStyle } from '../../../../../components-style/content/top-toolbar/items/buttons/useOpenSettingsButtonStyle'

export interface OpenSettingsButtonProps {
  disabled?: boolean
  open: () => void
}

export const OpenSettingsButton: VoidFunctionComponent<OpenSettingsButtonProps> = ({ disabled, open }) => {
  const classes = useOpenSettingsButtonStyle()
  return (
    <IconButton
      size="small"
      disabled={disabled}
      onClick={open}
      className={clsx(classes.settings, !disabled && classes.settingsActive)}
    >
      <Settings />
    </IconButton>
  )
}

import { VoidFunctionComponent } from 'react'
import { Settings } from '@mui/icons-material'
import { IconButton } from '@mui/material'

import { openSettingsButtonStyle } from '../../../../../components-style/content/top-toolbar/items/buttons/openSettingsButtonStyle'

export interface OpenSettingsButtonProps {
  disabled?: boolean
  open: () => void
}

export const OpenSettingsButton: VoidFunctionComponent<OpenSettingsButtonProps> = ({ disabled, open }) => (
  <IconButton size="small" disabled={disabled} onClick={open} sx={openSettingsButtonStyle}>
    <Settings />
  </IconButton>
)

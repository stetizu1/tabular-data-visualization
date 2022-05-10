import { VoidFunctionComponent } from 'react'
import { IconButton } from '@mui/material'
import { Settings } from '@mui/icons-material'

import { openSettingsButtonStyle } from '../../../../../components-style/content/top-toolbar/items/buttons/openSettingsButtonStyle'

export interface OpenSettingsButtonProps {
  disabled?: boolean
  open: () => void
}

export const OpenSettingsButton: VoidFunctionComponent<OpenSettingsButtonProps> = ({ disabled, open }) => (
  <IconButton disabled={disabled} onClick={open} sx={openSettingsButtonStyle.settings}>
    <Settings />
  </IconButton>
)

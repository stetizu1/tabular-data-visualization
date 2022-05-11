import { VoidFunctionComponent } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import { Settings } from '@mui/icons-material'

import { TOP_TOOLBAR_TEXT } from '../../../../../text/siteText'
import { openSettingsButtonStyle } from '../../../../../components-style/content/top-toolbar/items/buttons/openSettingsButtonStyle'

export interface OpenSettingsButtonProps {
  disabled?: boolean
  open: () => void
}

export const OpenSettingsButton: VoidFunctionComponent<OpenSettingsButtonProps> = ({ disabled, open }) => (
  <Tooltip title={TOP_TOOLBAR_TEXT.settings}>
    <IconButton disabled={disabled} onClick={open} sx={openSettingsButtonStyle.settings}>
      <Settings />
    </IconButton>
  </Tooltip>
)

import { VoidFunctionComponent } from 'react'
import { Button, Tooltip } from '@mui/material'
import { Settings } from '@mui/icons-material'

import { TOP_TOOLBAR_TEXT } from '../../../../../text/siteText'
import { openSettingsButtonStyle } from '../../../../../components-style/content/top-toolbar/items/buttons/openSettingsButtonStyle'

export interface OpenSettingsButtonProps {
  disabled?: boolean
  open: () => void
}

export const OpenSettingsButton: VoidFunctionComponent<OpenSettingsButtonProps> = ({ disabled, open }) => (
  <Button disabled={disabled} onClick={open} sx={openSettingsButtonStyle.settings}>
    <Tooltip title={TOP_TOOLBAR_TEXT.settings}>
      <Settings />
    </Tooltip>
  </Button>
)

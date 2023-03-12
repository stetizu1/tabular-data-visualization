/**
 * Button to open settings drawer
 */
import { Settings } from '@mui/icons-material'
import { Button, Tooltip } from '@mui/material'
import { FC } from 'react'

import { openSettingsButtonStyle } from '@/components-style/content/top-toolbar/items/buttons/openSettingsButtonStyle'
import { TOP_TOOLBAR_TEXT } from '@/text/siteText'

export interface OpenSettingsButtonProps {
  disabled?: boolean
  open: () => void
}

export const OpenSettingsButton: FC<OpenSettingsButtonProps> = ({ disabled, open }) => (
  <Button disabled={disabled} onClick={open} sx={openSettingsButtonStyle.settings}>
    <Tooltip title={TOP_TOOLBAR_TEXT.settings}>
      <Settings />
    </Tooltip>
  </Button>
)

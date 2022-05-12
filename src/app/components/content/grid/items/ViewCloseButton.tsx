import React, { VoidFunctionComponent } from 'react'
import { Button, Tooltip } from '@mui/material'
import { Close } from '@mui/icons-material'

import { VIEW_TOP_TEXT } from '../../../../text/viewTopText'

import { inlineButtonStyles } from '../../../../components-style/content/common/inlineButtonStyles'

interface ViewCloseButtonProps {
  onRemove: () => void
}

export const ViewCloseButton: VoidFunctionComponent<ViewCloseButtonProps> = ({ onRemove }) => (
  <Button onClick={onRemove} sx={inlineButtonStyles.buttonClose}>
    <Tooltip title={VIEW_TOP_TEXT.close}>
      <Close />
    </Tooltip>
  </Button>
)

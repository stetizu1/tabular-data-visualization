import React, { VoidFunctionComponent } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import { Close } from '@mui/icons-material'

import { GRID_ITEM_TEXT } from '../../../../text/gridItemText'
import { inlineButtonStyles } from '../../../../components-style/content/common/inlineButtonStyles'

interface ViewCloseButtonProps {
  onRemove: () => void
}

export const ViewCloseButton: VoidFunctionComponent<ViewCloseButtonProps> = ({ onRemove }) => (
  <IconButton onClick={onRemove} sx={inlineButtonStyles.buttonClose}>
    <Tooltip title={GRID_ITEM_TEXT.tooltipClose}>
      <Close />
    </Tooltip>
  </IconButton>
)

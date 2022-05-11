import React, { VoidFunctionComponent } from 'react'
import { Tooltip, Typography } from '@mui/material'
import { RotateRight } from '@mui/icons-material'

import { SelectableDataType } from '../../../../types/data/data'

import { getDisplayAttributesInParentheses } from '../../../../helpers/stringGetters'

import { GRID_ITEM_TEXT } from '../../../../text/gridItemText'

import { gridItemStyle } from '../../../../components-style/content/views/gridItemStyle'

export interface GlyphAxesTextProps {
  displayAttributes: Array<keyof SelectableDataType>
}

export const GlyphAxesText: VoidFunctionComponent<GlyphAxesTextProps> = ({ displayAttributes }) => (
  <Typography sx={gridItemStyle.text}>
    <Tooltip title={GRID_ITEM_TEXT.glyphAxes}>
      <RotateRight sx={gridItemStyle.textIcon} />
    </Tooltip>
    {getDisplayAttributesInParentheses(displayAttributes)}
  </Typography>
)

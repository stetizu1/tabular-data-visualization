import React, { VoidFunctionComponent } from 'react'
import { Tooltip, Typography } from '@mui/material'
import { RotateRight } from '@mui/icons-material'

import { SelectableDataType } from '../../../../types/data/data'

import { getDisplayAttributesInParentheses, getSpaced } from '../../../../helpers/stringGetters'

import { VIEW_TOP_TEXT } from '../../../../text/viewTopText'

import { gridItemStyle } from '../../../../components-style/content/views/gridItemStyle'

export interface GlyphAxesTextProps {
  displayAttributes: Array<keyof SelectableDataType>
}

export const GlyphAxesText: VoidFunctionComponent<GlyphAxesTextProps> = ({ displayAttributes }) => (
  <Tooltip title={getSpaced(VIEW_TOP_TEXT.glyphAxes, getDisplayAttributesInParentheses(displayAttributes))}>
    <Typography sx={gridItemStyle.text}>
      <RotateRight sx={gridItemStyle.textIcon} />
      {getDisplayAttributesInParentheses(displayAttributes)}
    </Typography>
  </Tooltip>
)

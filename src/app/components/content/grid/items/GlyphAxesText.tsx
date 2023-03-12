import { RotateRight } from '@mui/icons-material'
import { Tooltip, Typography } from '@mui/material'
import { FC } from 'react'

import { SelectableDataType } from '@/types/data/data'

import { getDisplayAttributesInParentheses, getSpaced } from '@/helpers/stringGetters'

import { VIEW_TOP_TEXT } from '@/text/viewTopText'

import { gridItemStyle } from '@/components-style/content/views/gridItemStyle'

export interface GlyphAxesTextProps {
  displayAttributes: Array<keyof SelectableDataType>
}

export const GlyphAxesText: FC<GlyphAxesTextProps> = ({ displayAttributes }) => (
  <Tooltip title={getSpaced(VIEW_TOP_TEXT.glyphAxes, getDisplayAttributesInParentheses(displayAttributes))}>
    <Typography sx={gridItemStyle.text}>
      <RotateRight sx={gridItemStyle.textIcon} />
      {getDisplayAttributesInParentheses(displayAttributes)}
    </Typography>
  </Tooltip>
)

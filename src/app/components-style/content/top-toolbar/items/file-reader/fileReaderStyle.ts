import { SxProps } from '@mui/system'

import { border, px } from '../../../../../helpers/d3/stringGetters'
import { HIGHLIGHT_COLOR } from '../../../../../styles/colors'

export const getFileReaderBoxStyle = (isHighlighted: boolean): SxProps => ({
  transition: `0.3s all ease`,
  border: isHighlighted ? border(2, HIGHLIGHT_COLOR.border) : border(0, HIGHLIGHT_COLOR.border),
  background: isHighlighted ? HIGHLIGHT_COLOR.background : HIGHLIGHT_COLOR.backgroundGone,

  padding: isHighlighted ? px(10, 0) : 0,
  borderRadius: 5,
  '& input': {
    width: px(220),
  },
})

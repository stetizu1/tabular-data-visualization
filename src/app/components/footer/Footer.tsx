import { VoidFunctionComponent } from 'react'
import { Box } from '@mui/material'

import { FOOTER_TEXT } from '../../text/footerText'
import { footerStyle } from '../../components-style/footer/footerStyle'

export const Footer: VoidFunctionComponent = () => (
  <Box sx={footerStyle.footerContainer}>
    <Box sx={footerStyle.text}>{FOOTER_TEXT.author},</Box>
    <Box sx={footerStyle.text}>
      &copy; {FOOTER_TEXT.school}, {FOOTER_TEXT.year}
    </Box>
  </Box>
)

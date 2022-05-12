import { VoidFunctionComponent } from 'react'
import { Box, Link, Typography } from '@mui/material'
import { GitHub } from '@mui/icons-material'

import { GITHUB_LINK } from '../../constants/link'

import { FOOTER_TEXT } from '../../text/footerText'

import { footerStyle } from '../../components-style/footer/footerStyle'

export const Footer: VoidFunctionComponent = () => (
  <Box sx={footerStyle.footerContainer}>
    <Typography sx={footerStyle.text}>
      {FOOTER_TEXT.openSource}
      <Link href={GITHUB_LINK} sx={footerStyle.text}>
        <GitHub sx={footerStyle.githubIcon} />
        {FOOTER_TEXT.github}
      </Link>
    </Typography>
    <Box sx={footerStyle.right}>
      <Box sx={footerStyle.text}>{FOOTER_TEXT.author},</Box>
      <Box sx={footerStyle.text}>
        &copy; {FOOTER_TEXT.school}, {FOOTER_TEXT.year}
      </Box>
    </Box>
  </Box>
)

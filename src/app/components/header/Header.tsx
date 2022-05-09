import { VoidFunctionComponent } from 'react'
import { Box } from '@mui/material'

import { HEADER_TEXT } from '../../text/headerText'
import { headerStyle } from '../../components-style/header/headerStyle'

export const Header: VoidFunctionComponent = () => (
  <Box sx={headerStyle.headerContainer}>
    <Box sx={headerStyle.title}>{HEADER_TEXT.title}</Box>
    <Box sx={headerStyle.description}>{HEADER_TEXT.description}</Box>
  </Box>
)

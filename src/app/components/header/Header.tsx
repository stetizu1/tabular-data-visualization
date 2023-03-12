/**
 * Application header
 */
import { Box } from '@mui/material'
import { FC } from 'react'

import { HEADER_TEXT } from '@/text/headerText'

import { headerStyle } from '@/components-style/header/headerStyle'

export const Header: FC = () => (
  <Box sx={headerStyle.headerContainer}>
    <Box sx={headerStyle.title}>{HEADER_TEXT.title}</Box>
    <Box sx={headerStyle.description}>{HEADER_TEXT.description}</Box>
  </Box>
)

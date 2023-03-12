/**
 * Application root
 */
import { Box } from '@mui/material'
import { FC } from 'react'

import { DataContext } from './components/content/context/DataContext'
import { Footer } from './components/footer/Footer'
import { Header } from './components/header/Header'

import { appStyle } from './appStyle'

export const App: FC = () => (
  <Box sx={appStyle.app}>
    <Header />
    <Box sx={appStyle.content}>
      <DataContext />
    </Box>
    <Footer />
  </Box>
)

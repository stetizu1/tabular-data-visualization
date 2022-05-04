import { VoidFunctionComponent } from 'react'
import { Box } from '@mui/material'

import { Header } from './components/header/Header'
import { Footer } from './components/footer/Footer'
import { DataContext } from './components/content/context/DataContext'

import { appStyle } from './appStyle'

export const App: VoidFunctionComponent = () => (
  <Box sx={appStyle.app}>
    <Header />
    <Box sx={appStyle.contentStyle}>
      <DataContext />
    </Box>
    <Footer />
  </Box>
)

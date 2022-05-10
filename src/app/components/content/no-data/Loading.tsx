import { VoidFunctionComponent } from 'react'
import { Box } from '@mui/material'

import { EMPTY_DATA_TEXT } from '../../../text/siteText'

import { loadingStyle } from '../../../components-style/content/no-data/loadingStyle'

export const Loading: VoidFunctionComponent = () => <Box sx={loadingStyle.load}>{EMPTY_DATA_TEXT.loading}</Box>

import { VoidFunctionComponent } from 'react'
import { Box } from '@mui/material'

import { loadingStyle } from '../../../components-style/content/no-data/loadingStyle'
import { EMPTY_DATA_TEXT } from '../../../text/SiteText'

export const Loading: VoidFunctionComponent = () => <Box sx={loadingStyle.load}>{EMPTY_DATA_TEXT.loading}</Box>

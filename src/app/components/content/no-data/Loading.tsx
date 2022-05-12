import { VoidFunctionComponent } from 'react'
import { Box } from '@mui/material'

import { EMPTY_DATA_TEXT } from '../../../text/siteText'

import { emptyDataStyle } from '../../../components-style/content/no-data/emptyDataStyle'

export const Loading: VoidFunctionComponent = () => <Box sx={emptyDataStyle.text}>{EMPTY_DATA_TEXT.loading}</Box>

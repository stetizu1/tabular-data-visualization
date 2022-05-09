import { VoidFunctionComponent } from 'react'
import { Box } from '@mui/material'

import { EMPTY_DATA_TEXT } from '../../../text/siteText'

import { emptyDataStyle } from '../../../components-style/content/no-data/emptyDataStyle'

export const EmptyData: VoidFunctionComponent = () => <Box sx={emptyDataStyle.site}>{EMPTY_DATA_TEXT.content}</Box>

/**
 * Page content while loading the dataset.
 */
import { Box } from '@mui/material'
import { FC } from 'react'

import { EMPTY_DATA_TEXT } from '@/text/siteText'

import { emptyDataStyle } from '@/components-style/content/no-data/emptyDataStyle'

export const Loading: FC = () => <Box sx={emptyDataStyle.text}>{EMPTY_DATA_TEXT.loading}</Box>

import React, { VoidFunctionComponent, ComponentProps } from 'react'
import { useSize } from 'react-use'
import { Box, IconButton, Typography } from '@mui/material'
import { Close } from '@mui/icons-material'

import { ViewType } from '../../../constants/views/ViewTypes'
import { DRAG_HANDLE, HEADER_HEIGHT, VIEW_DEFAULT_SIZE } from '../../../constants/views/common'

import { gridItemStyle } from '../../../components-style/content/views/gridItemStyle'

import { DataSaveButton } from '../common/DataSaveButton'
import { View } from './View'

type Props = Omit<ComponentProps<typeof View>, `width` | `height`> & {
  title: string
  onRemove: () => void
  isDragFinished: boolean
}

export const GridItem: VoidFunctionComponent<Props> = ({ onRemove, title, isDragFinished, ...rest }) => {
  const [sized] = useSize(
    ({ width, height }) => (
      <Box sx={gridItemStyle.gridItem}>
        <Box sx={gridItemStyle.header} className={DRAG_HANDLE}>
          <Typography sx={gridItemStyle.text}>{title}</Typography>
          <Box>
            {rest.component !== ViewType.DataTable && <DataSaveButton viewType={rest.component} />}
            <IconButton onClick={onRemove}>
              <Close />
            </IconButton>
          </Box>
        </Box>
        {isDragFinished && <View width={width} height={height - HEADER_HEIGHT} {...rest} />}
      </Box>
    ),
    VIEW_DEFAULT_SIZE,
  )

  return sized
}

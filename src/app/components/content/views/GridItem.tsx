import React, { VoidFunctionComponent, ComponentProps, useState } from 'react'
import { useSize } from 'react-use'
import { Box, IconButton, Typography } from '@mui/material'
import { Close } from '@mui/icons-material'

import { ViewType } from '../../../constants/views/ViewType'
import { DRAG_HANDLE, HEADER_HEIGHT, VIEW_DEFAULT_SIZE } from '../../../constants/views/common'

import { gridItemStyle } from '../../../components-style/content/views/gridItemStyle'

import { DataSaveButton } from '../common/DataSaveButton'
import { View } from './View'
import { DataFilterButton } from './data-table/DataFilterButton'

type Props = Omit<ComponentProps<typeof View>, `width` | `height`> & {
  title: string
  onRemove: () => void
  isResizeFinished: boolean
}

export const GridItem: VoidFunctionComponent<Props> = ({ onRemove, title, isResizeFinished, viewType, ...rest }) => {
  const [showFilter, setShowFilter] = useState<boolean | undefined>(undefined)
  const [sized] = useSize(
    ({ width, height }) => (
      <Box sx={gridItemStyle.gridItem}>
        <Box sx={gridItemStyle.header} className={DRAG_HANDLE}>
          <Typography sx={gridItemStyle.text}>{title}</Typography>
          <Box>
            {viewType !== ViewType.DataTable ? (
              <DataSaveButton viewType={viewType} />
            ) : (
              <DataFilterButton showFilter={showFilter} setShowFilter={setShowFilter} />
            )}
            <IconButton onClick={onRemove}>
              <Close />
            </IconButton>
          </Box>
        </Box>
        {isResizeFinished && (
          <View width={width} height={height - HEADER_HEIGHT} viewType={viewType} {...rest} showFilter={showFilter} />
        )}
      </Box>
    ),
    VIEW_DEFAULT_SIZE,
  )

  return sized
}

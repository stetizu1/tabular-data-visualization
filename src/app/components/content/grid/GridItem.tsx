import React, { ComponentProps, useState, VoidFunctionComponent } from 'react'
import { useSize } from 'react-use'
import { Box, Typography } from '@mui/material'

import { ViewType } from '../../../constants/views-general/ViewType'
import { DRAG_HANDLE, GRID_ITEM_HEADER_HEIGHT, VIEW_DEFAULT_SIZE } from '../../../constants/layout/layout'

import { gridItemStyle } from '../../../components-style/content/views/gridItemStyle'

import { View } from '../views/View'
import { ViewCloseButton } from './items/ViewCloseButton'
import { ViewHelpButton } from './items/ViewHelpButton'
import { ViewSaveButton } from './items/ViewSaveButton'
import { GlyphAxesText } from './items/GlyphAxesText'
import { DataFilterButton } from './items/DataFilterButton'

type Props = Omit<ComponentProps<typeof View>, `width` | `height`> & {
  title: string
  onRemove: () => void
  isResizeFinished: boolean
}

export const GridItem: VoidFunctionComponent<Props> = ({ onRemove, title, isResizeFinished, viewType, ...rest }) => {
  const [showFilter, setShowFilter] = useState<boolean | undefined>(undefined)
  const contextButton =
    viewType !== ViewType.DataTable ? (
      <ViewSaveButton viewType={viewType} />
    ) : (
      <DataFilterButton showFilter={showFilter} setShowFilter={setShowFilter} />
    )

  const isGlyphs = (viewType === ViewType.Glyphs || viewType === ViewType.ScatterPlotGlyphs) && rest.settings[viewType]

  const [sized] = useSize(
    ({ width, height }) => (
      <Box sx={gridItemStyle.gridItem}>
        <Box sx={gridItemStyle.header} className={DRAG_HANDLE}>
          <Box sx={gridItemStyle.textBox}>
            <Typography>{title}</Typography>
            {isGlyphs && <GlyphAxesText displayAttributes={rest.settings[viewType]!.displayAttributes} />}
          </Box>
          <Box sx={gridItemStyle.right}>
            <ViewHelpButton viewType={viewType} />
            {contextButton}
            <ViewCloseButton onRemove={onRemove} />
          </Box>
        </Box>
        {isResizeFinished && (
          <View
            width={width}
            height={height - GRID_ITEM_HEADER_HEIGHT}
            viewType={viewType}
            {...rest}
            showFilter={showFilter}
          />
        )}
      </Box>
    ),
    VIEW_DEFAULT_SIZE,
  )

  return sized
}

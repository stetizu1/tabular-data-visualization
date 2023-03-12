/**
 * Single item in the grid, passing it's size to the children.
 */
import { Box, Typography } from '@mui/material'
import { ComponentProps, FC, useState } from 'react'
import { useSize } from 'react-use'

import { DRAG_HANDLE, GRID_ITEM_HEADER_HEIGHT, VIEW_DEFAULT_SIZE } from '@/constants/layout/layout'
import { ViewType } from '@/constants/views-general/ViewType'

import { gridItemStyle } from '@/components-style/content/views/gridItemStyle'

import { View } from '../views/View'
import { DataFilterButton } from './items/DataFilterButton'
import { GlyphAxesText } from './items/GlyphAxesText'
import { ViewCloseButton } from './items/ViewCloseButton'
import { ViewHelpButton } from './items/ViewHelpButton'
import { ViewSaveButton } from './items/ViewSaveButton'

type Props = Omit<ComponentProps<typeof View>, `width` | `height`> & {
  title: string
  onRemove: () => void
  isResizeFinished: boolean
}

export const GridItem: FC<Props> = ({ onRemove, title, isResizeFinished, viewType, ...rest }) => {
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

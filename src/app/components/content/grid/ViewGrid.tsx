import React, { Dispatch, VoidFunctionComponent, SetStateAction, useCallback, useState, memo, useEffect } from 'react'
import GridLayout, { WidthProvider } from 'react-grid-layout'
import { Box } from '@mui/material'
import { AddCircle } from '@mui/icons-material'

import { Brushable } from '../../../types/brushing/Brushable'
import { SelectableDataType } from '../../../types/data/data'
import { GridLayoutItem, LayoutArray } from '../../../types/views/Grid'
import { Settings } from '../../../types/views/settings/Settings'

import { getClass } from '../../../helpers/stringGetters'
import { setDisplay } from '../../../helpers/d3/setDisplay'

import { isViewType, ViewType } from '../../../constants/views-general/ViewType'
import { COLUMNS_COUNT, DEFAULT_VIEW_DIMENSIONS, DRAG_HANDLE, ROW_HEIGHT } from '../../../constants/layout/layout'
import { TOOLTIP_CLASS } from '../../../constants/views-general/tooltip'

import { TOP_TOOLBAR_TEXT } from '../../../text/siteText'
import { VIEW_NAMES } from '../../../text/views-and-settings/common'

import { viewGridStyle } from '../../../components-style/content/views/viewGridStyle'

import { SettingsDrawer } from '../data-drawer/SettingsDrawer'
import { LayoutDialog } from '../top-toolbar/items/layout/LayoutDialog'
import { SelectionDialog } from '../common/dialogs/SelectionDialog'
import { GridItem } from './GridItem'

export interface ViewGridDataProps extends Brushable {
  dataset: ReadonlyArray<SelectableDataType>
}

export interface ViewGridProps extends ViewGridDataProps {
  isDrawerOpen: boolean
  isDetailsVisible: boolean
  closeDrawer: () => void
  cleanSelectedIfViewWasBrushing: (viewType: ViewType) => void
  settings: Settings
  setSettings: Dispatch<SetStateAction<Settings>>

  isLayoutDialogOpen: boolean
  setIsLayoutDialogOpen: Dispatch<SetStateAction<boolean>>
  isAddViewDialogOpen: boolean
  setIsAddViewDialogOpen: Dispatch<SetStateAction<boolean>>
  layout: GridLayoutItem[]
  setLayout: Dispatch<SetStateAction<GridLayoutItem[] | null>>
  brushColor: string
}

const ReactGridLayout = WidthProvider(GridLayout)

const BaseViewGrid: VoidFunctionComponent<ViewGridProps> = ({
  isDrawerOpen,
  closeDrawer,
  cleanSelectedIfViewWasBrushing,
  settings,
  setSettings,
  isAddViewDialogOpen,
  setIsAddViewDialogOpen,
  isLayoutDialogOpen,
  setIsLayoutDialogOpen,
  layout,
  setLayout,
  ...viewProps
}) => {
  const [viewResizing, setViewResizing] = useState<ViewType | null>(null)
  const [lastLayout, setLastLayout] = useState(layout)

  useEffect(
    () => () => {
      if (layout !== null) setLastLayout(layout)
    },
    [layout],
  )

  const updateLayout = useCallback(
    (newLayout: LayoutArray) => {
      if (!newLayout || layout.length === 0) return
      const filteredLayout = newLayout.filter((item) => isViewType(item.i))
      setLayout(filteredLayout as GridLayoutItem[])
    },
    [setLayout, layout],
  )

  const addView = useCallback(
    (viewType: ViewType) => {
      setIsAddViewDialogOpen(false)
      setLayout((layout) => {
        if (layout === null) return layout // should not happen
        if (layout.find((item) => item.i === viewType)) return layout
        const posY = layout.reduce((max, item) => Math.max(item.y, max), 0) + 1
        return [...layout, { i: viewType, x: 0, y: posY, ...DEFAULT_VIEW_DIMENSIONS[viewType] }]
      })
    },
    [setIsAddViewDialogOpen, setLayout],
  )

  const removeView = useCallback(
    (viewType: ViewType) => {
      setLayout((layout) => {
        if (layout === null) return layout // should not happen
        return layout.filter((item) => item.i !== viewType)
      })
    },
    [setLayout],
  )

  setDisplay(viewProps.isDetailsVisible, TOOLTIP_CLASS)

  const views = layout.map((item) => item.i)
  const availableViews = Object.values(ViewType).filter((viewType) => !views.includes(viewType))
  const dialogOptions = availableViews.map((key) => ({ key, label: VIEW_NAMES[key], icon: <AddCircle /> }))
  return (
    <Box>
      <SelectionDialog
        isOpen={isAddViewDialogOpen}
        onClose={() => setIsAddViewDialogOpen(false)}
        title={TOP_TOOLBAR_TEXT.addViewDialogTitle}
        options={dialogOptions}
        noOptionText={TOP_TOOLBAR_TEXT.noOption}
        handleListItemClick={addView}
      />
      <LayoutDialog
        isOpen={isLayoutDialogOpen}
        setLayout={setLayout}
        onClose={() => setIsLayoutDialogOpen(false)}
        lastLayout={lastLayout}
      />
      <SettingsDrawer
        isOpen={isDrawerOpen}
        close={closeDrawer}
        dataset={viewProps.dataset}
        views={views}
        settings={settings}
        setSettings={setSettings}
        cleanSelectedIfViewWasBrushing={cleanSelectedIfViewWasBrushing}
      />
      <Box sx={viewGridStyle.tooltip} className={TOOLTIP_CLASS} />
      <ReactGridLayout
        onLayoutChange={updateLayout}
        draggableHandle={getClass(DRAG_HANDLE)}
        onResizeStart={(_, view) => setViewResizing(view.i as ViewType)}
        onResizeStop={() => setViewResizing(null)}
        cols={COLUMNS_COUNT}
        rowHeight={ROW_HEIGHT}
        isResizable
      >
        {layout.map((view) => (
          <Box key={view.i} data-grid={view}>
            <GridItem
              isResizeFinished={view.i !== viewResizing}
              title={VIEW_NAMES[view.i]}
              onRemove={() => {
                cleanSelectedIfViewWasBrushing(view.i)
                removeView(view.i)
              }}
              viewType={view.i}
              settings={settings}
              {...viewProps}
            />
          </Box>
        ))}
      </ReactGridLayout>
    </Box>
  )
}

// do not rerender if props not change
export const ViewGrid = memo(BaseViewGrid)
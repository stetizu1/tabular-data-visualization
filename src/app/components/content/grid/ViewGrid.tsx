import React, { Dispatch, VoidFunctionComponent, SetStateAction, useCallback, useState, memo, useEffect } from 'react'
import GridLayout, { WidthProvider } from 'react-grid-layout'
import { Box } from '@mui/material'
import { AddCircle } from '@mui/icons-material'

import { useWindowSize } from 'react-use'
import { Brushable } from '../../../types/brushing/Brushable'
import { SelectableDataType } from '../../../types/data/data'
import { GridLayoutItem, LayoutArray } from '../../../types/views/Grid'
import { Settings } from '../../../types/views/settings/Settings'

import { getClass } from '../../../helpers/stringGetters'
import { setDisplay } from '../../../helpers/d3/setDisplay'

import { brushView, brushViewType, isBrushView, isViewType, ViewType } from '../../../constants/views-general/ViewType'
import { COLUMNS_COUNT, DEFAULT_VIEW_DIMENSIONS, DRAG_HANDLE, ROW_HEIGHT } from '../../../constants/layout/layout'
import { TOOLTIP_CLASS } from '../../../constants/views-general/tooltip'

import { TOP_TOOLBAR_TEXT } from '../../../text/siteText'
import { VIEWS_NAMES } from '../../../text/viewsNames'

import { viewGridStyle } from '../../../components-style/content/views/viewGridStyle'

import { SettingsDrawer } from '../data-drawer/SettingsDrawer'
import { LayoutDialog } from '../top-toolbar/items/layout/LayoutDialog'
import { SelectionDialog } from '../common/dialogs/SelectionDialog'
import { GridItem } from './GridItem'

export interface ViewGridDataProps extends Omit<Brushable, `registerCleanBrushing`> {
  dataset: ReadonlyArray<SelectableDataType>
  registerCleanBrushingAll: (viewType: ViewType, clean: () => void) => void
}

export interface ViewGridProps extends ViewGridDataProps {
  isDrawerOpen: boolean
  isDetailsVisible: boolean
  closeDrawer: () => void
  cleanSelectedIfViewWasBrushing: (viewType: ViewType | brushViewType) => void
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
  registerCleanBrushingAll,
  ...viewProps
}) => {
  const [viewResizing, setViewResizing] = useState<ViewType | null>(null)
  const [lastLayout, setLastLayout] = useState(layout)
  const { width: windowWidth, height: windowHeight } = useWindowSize()

  useEffect(
    () => () => {
      if (layout !== null) setLastLayout(layout)
    },
    [layout],
  )

  useEffect(
    () => () => {
      cleanSelectedIfViewWasBrushing(brushView)
    },
    [windowWidth, windowHeight, cleanSelectedIfViewWasBrushing],
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
  const dialogOptions = availableViews.map((key) => ({ key, label: VIEWS_NAMES[key], icon: <AddCircle /> }))
  return (
    <Box>
      <SelectionDialog
        isOpen={isAddViewDialogOpen}
        onClose={() => setIsAddViewDialogOpen(false)}
        title={TOP_TOOLBAR_TEXT.addDialog.title}
        options={dialogOptions}
        noOptionText={TOP_TOOLBAR_TEXT.addDialog.noOption}
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
        style={{ overflowX: `hidden` }}
        onLayoutChange={updateLayout}
        draggableHandle={getClass(DRAG_HANDLE)}
        onResizeStart={(_, view) => {
          const viewType = view.i as ViewType
          if (isBrushView(viewType)) cleanSelectedIfViewWasBrushing(viewType)
          setViewResizing(viewType)
        }}
        onResizeStop={() => setViewResizing(null)}
        cols={COLUMNS_COUNT}
        rowHeight={ROW_HEIGHT}
        isResizable
      >
        {layout.map((view) => (
          <Box key={view.i} data-grid={view}>
            <GridItem
              isResizeFinished={view.i !== viewResizing}
              title={VIEWS_NAMES[view.i]}
              onRemove={() => {
                cleanSelectedIfViewWasBrushing(view.i)
                removeView(view.i)
              }}
              viewType={view.i}
              settings={settings}
              registerCleanBrushing={(clean: () => void) => registerCleanBrushingAll(view.i, clean)}
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

import { Dispatch, VoidFunctionComponent, SetStateAction, useCallback, useState } from 'react'
import GridLayout, { WidthProvider } from 'react-grid-layout'
import { Box } from '@mui/material'
import { AddCircle } from '@mui/icons-material'

import { Brushable } from '../../../types/brushing/Brushable'
import { SelectableDataType } from '../../../types/data/data'
import { SideEffectVoid } from '../../../types/basic/functionTypes'
import { GridLayoutItem, LayoutArray } from '../../../types/views/Grid'
import { Settings } from '../../../types/views/settings/Settings'

import { getClass } from '../../../helpers/d3/stringGetters'
import { displayDetails } from '../../../helpers/d3/displayDetails'

import { isViewType, ViewType } from '../../../constants/views/ViewTypes'
import { COLUMNS_COUNT, DEFAULT_VIEW_DIMENSIONS, DRAG_HANDLE, ROW_HEIGHT } from '../../../constants/views/common'
import { TOOLTIP_CLASS } from '../../../constants/views/tooltip'
import { TOP_TOOLBAR_TEXT } from '../../../text/SiteText'
import { VIEW_NAMES } from '../../../text/views-and-menus/common'

import { viewGridStyle } from '../../../components-style/content/views/viewGridStyle'

import { DataDrawer } from '../data-drawer/DataDrawer'
import { SelectionDialog } from '../common/dialogs/SelectionDialog'
import { GridItem } from './GridItem'

export interface ViewGridDataProps extends Brushable {
  dataset: ReadonlyArray<SelectableDataType>
}

export interface ViewGridProps extends ViewGridDataProps {
  isDrawerOpen: boolean
  isDetailsVisible: boolean
  closeDrawer: SideEffectVoid
  cleanSelectedIfViewWasBrushing: (viewType: ViewType) => void
  settings: Settings
  setSettings: Dispatch<SetStateAction<Settings>>

  isAddViewDialogOpen: boolean
  setIsAddViewDialogOpen: Dispatch<SetStateAction<boolean>>
  layout: GridLayoutItem[]
  setLayout: Dispatch<SetStateAction<GridLayoutItem[]>>
  brushColor: string
}

const ReactGridLayout = WidthProvider(GridLayout)

export const ViewGrid: VoidFunctionComponent<ViewGridProps> = ({
  isDrawerOpen,
  closeDrawer,
  cleanSelectedIfViewWasBrushing,
  settings,
  setSettings,
  isAddViewDialogOpen,
  setIsAddViewDialogOpen,
  layout,
  setLayout,
  ...viewProps
}) => {
  const [viewResizing, setViewResizing] = useState<ViewType | null>(null)

  const updateLayout = useCallback(
    (newLayout: LayoutArray) => {
      if (!newLayout) return
      const filteredLayout = newLayout.filter((item) => isViewType(item.i))
      setLayout(filteredLayout as GridLayoutItem[])
    },
    [setLayout],
  )

  const addView = useCallback(
    (viewType: ViewType) => {
      setIsAddViewDialogOpen(false)
      setLayout((layout) => {
        if (layout.find((item) => item.i === viewType)) return layout
        const posY = layout.reduce((max, item) => Math.max(item.y, max), 0) + 1
        return [...layout, { i: viewType, x: 0, y: posY, ...DEFAULT_VIEW_DIMENSIONS[viewType] }]
      })
    },
    [setIsAddViewDialogOpen, setLayout],
  )

  const removeView = useCallback(
    (viewType: ViewType) => {
      setLayout((layout) => layout.filter((item) => item.i !== viewType))
    },
    [setLayout],
  )

  displayDetails(viewProps.isDetailsVisible, TOOLTIP_CLASS)

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
      <DataDrawer
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
              component={view.i}
              settings={settings}
              {...viewProps}
            />
          </Box>
        ))}
      </ReactGridLayout>
    </Box>
  )
}

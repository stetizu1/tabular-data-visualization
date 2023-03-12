/**
 * Data management component:
 *  maintains the current state of this data,
 *  creates functions for working with this data and
 *  distributes them between the top toolbar and views/settings
 */
import { FC, useCallback, useEffect, useState } from 'react'

import { SetComponentBrushing } from '@/types/brushing/Brushable'
import { SelectableDataType } from '@/types/data/data'
import { GridLayoutItem } from '@/types/views/Grid'
import { Settings } from '@/types/views/settings/Settings'

import { getCategoryAttributesKeys, getDefaultQuantitativeAttributesKeys } from '@/helpers/data/data'
import { useDebounce } from '@/helpers/react/useDebounce'
import { useUpdatedRef } from '@/helpers/react/useUpdatedRef'

import { DataLoadState } from '@/constants/data/DataLoadState'
import { BRUSH_DEBOUNCE } from '@/constants/debounce/debounce'
import { DEFAULT_GRID_LAYOUT_NOMINAL, DEFAULT_GRID_LAYOUT_QUANTITATIVE } from '@/constants/layout/layout'
import { DEFAULT_BRUSH_COLOR } from '@/constants/views-general/defaultSettableColors'
import { brushView, brushViewType, isBrushView, ViewType } from '@/constants/views-general/ViewType'

import { ViewGrid } from '../grid/ViewGrid'
import { EmptyData } from '../no-data/EmptyData'
import { Loading } from '../no-data/Loading'
import { TopToolbar } from '../top-toolbar/TopToolbar'

export const DataContext: FC = () => {
  const [dataLoadState, setDataLoadState] = useState(DataLoadState.NoData)

  const [dataset, setDataset] = useState<ReadonlyArray<SelectableDataType> | null>(null)
  const [settings, setSettings] = useState<Settings>({})

  const [componentBrushing, setCurrentComponentBrushing] = useState<null | ViewType>(null)
  const [cleanBrushing, setCleanBrushing] = useState<Partial<Record<ViewType, () => void>>>({})
  const [currentRedrawTime, setRedrawTime] = useState(Date.now())

  const redrawTime = useDebounce(currentRedrawTime, BRUSH_DEBOUNCE) // used for less component re-renders

  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false)
  const [isDetailsVisible, setIsDetailsVisible] = useState(true)
  const [isBrushingOnEndOfMove, setIsBrushingOnEndOfMove] = useState(false)

  const [isLayoutDialogOpen, setIsLayoutDialogOpen] = useState(false)
  const [isAddViewDialogOpen, setIsAddViewDialogOpen] = useState(false)
  const [layout, setLayout] = useState<GridLayoutItem[] | null>(null) // should not be set to null again
  const [brushColor, setBrushColor] = useState<string>(DEFAULT_BRUSH_COLOR)

  // On the first time user adds a dataset, set layout
  useEffect(() => {
    if (!dataset || layout !== null) return
    setLayout(
      getCategoryAttributesKeys(dataset).length > getDefaultQuantitativeAttributesKeys(dataset).length
        ? DEFAULT_GRID_LAYOUT_NOMINAL
        : DEFAULT_GRID_LAYOUT_QUANTITATIVE,
    )
  }, [dataset, layout])

  const cleanBrushingRef = useUpdatedRef(cleanBrushing)
  const componentBrushingRef = useUpdatedRef(componentBrushing)

  // Setting up a new dataset with the addition of deleting the previous brushing and resetting the settings in case this data remained from the previous one
  const setNewDataset = useCallback((data: ReadonlyArray<SelectableDataType> | null) => {
    setSettings({})
    setDataset(data)
    setCurrentComponentBrushing(null)
  }, [])

  // Forces redrawing of the views
  const refreshViews = useCallback((): void => {
    setRedrawTime(Date.now()) // redraw component
  }, [])

  // Removes all brush elements from the views; it also resets the previous selection unless told otherwise
  const cleanAllBrushes = useCallback(
    (deletePrevSelection = true) => {
      if (dataset && deletePrevSelection) {
        dataset.forEach((data) => (data.selected = false))
        refreshViews()
      }
      Object.values(cleanBrushingRef.current).forEach((f) => f())
    },
    [cleanBrushingRef, dataset, refreshViews],
  )

  // Removes all brushing
  const handleClearBrushesOnButtonClick = useCallback(() => {
    setCurrentComponentBrushing(null)
    cleanAllBrushes()
  }, [cleanAllBrushes])

  // Sets the brushing component. If the component has changed, it removes the brushing elements or even deselects the data, if needed
  const setComponentBrushing: SetComponentBrushing = useCallback(
    (newComponent) => {
      if (componentBrushingRef.current !== newComponent) {
        cleanAllBrushes(isBrushView(newComponent) || newComponent === null)
      }
      setCurrentComponentBrushing(newComponent)
    },
    [cleanAllBrushes, componentBrushingRef],
  )

  // Registers the function for cleaning brush elements for a given view
  const registerCleanBrushingAll = useCallback((viewType: ViewType, cleanBrushing: () => void) => {
    setCleanBrushing((prev) => ({
      ...prev,
      [viewType]: cleanBrushing,
    }))
  }, [])

  // If given view was brushing, this will cancel this brushing
  const cleanSelectedIfViewWasBrushing = useCallback(
    (component: ViewType | brushViewType) => {
      if (
        componentBrushingRef.current === component ||
        (component === brushView && isBrushView(componentBrushingRef.current))
      ) {
        cleanAllBrushes()
        setCurrentComponentBrushing(null)
      }
    },
    [cleanAllBrushes, componentBrushingRef],
  )

  // Removes current brushing and applies new rule
  const setIsBrushingOnEndOfMoveAndRemoveBrushing = useCallback(
    (newIsBrushingOnEndOfMove: boolean) => {
      cleanAllBrushes()
      setCurrentComponentBrushing(null)
      setIsBrushingOnEndOfMove(newIsBrushingOnEndOfMove)
    },
    [cleanAllBrushes],
  )

  const closeDrawer = useCallback(() => setDrawerOpen(false), [])
  const openDrawer = useCallback(() => setDrawerOpen(true), [])

  const topToolbarComponent = (
    <TopToolbar
      openDrawer={openDrawer}
      isToolsDisabled={dataset === null}
      isDetailsVisible={isDetailsVisible}
      setIsDetailsVisible={setIsDetailsVisible}
      isBrushingOnEndOfMove={isBrushingOnEndOfMove}
      setIsBrushingOnEndOfMove={setIsBrushingOnEndOfMoveAndRemoveBrushing}
      isBrushingActive={componentBrushingRef.current !== null}
      clearBrushes={handleClearBrushesOnButtonClick}
      setDataset={setNewDataset}
      setDataLoadState={setDataLoadState}
      setIsLayoutDialogOpen={setIsLayoutDialogOpen}
      removeLayout={() => setLayout([])}
      setIsAddViewDialogOpen={setIsAddViewDialogOpen}
      brushColor={brushColor}
      setBrushColor={setBrushColor}
    />
  )

  if (dataLoadState === DataLoadState.NoData) {
    return (
      <>
        {topToolbarComponent}
        <EmptyData />
      </>
    )
  }
  if (dataLoadState === DataLoadState.Loading || !dataset) {
    return (
      <>
        {topToolbarComponent}
        <Loading />
      </>
    )
  }
  if (!layout) return null // temporary, useEffect will set the layout

  return (
    <>
      {topToolbarComponent}
      <ViewGrid
        isDrawerOpen={isDrawerOpen}
        isDetailsVisible={isDetailsVisible}
        closeDrawer={closeDrawer}
        cleanSelectedIfViewWasBrushing={cleanSelectedIfViewWasBrushing}
        settings={settings}
        setSettings={setSettings}
        dataset={dataset}
        isLayoutDialogOpen={isLayoutDialogOpen}
        setIsLayoutDialogOpen={setIsLayoutDialogOpen}
        isAddViewDialogOpen={isAddViewDialogOpen}
        setIsAddViewDialogOpen={setIsAddViewDialogOpen}
        layout={layout}
        setLayout={setLayout}
        brushColor={brushColor}
        registerCleanBrushingAll={registerCleanBrushingAll}
        setComponentBrushing={setComponentBrushing}
        refreshViews={refreshViews}
        redrawTime={redrawTime}
        isBrushingActive={componentBrushingRef.current !== null}
        isBrushingOnEndOfMove={isBrushingOnEndOfMove}
      />
    </>
  )
}

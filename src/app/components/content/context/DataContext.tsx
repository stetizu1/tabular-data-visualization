import { useCallback, useEffect, useState, VoidFunctionComponent } from 'react'

import { SelectableDataType } from '../../../types/data/data'
import { SideEffectVoid } from '../../../types/basic/functionTypes'
import { SetComponentBrushing } from '../../../types/brushing/Brushable'
import { Settings } from '../../../types/views/settings/Settings'
import { GridLayoutItem } from '../../../types/views/Grid'

import { useUpdatedRef } from '../../../helpers/react/useUpdatedRef'
import { useDebounce } from '../../../helpers/react/useDebounce'

import { DataLoadState } from '../../../constants/data/dataLoadState'
import { ViewType } from '../../../constants/views/ViewType'
import {
  DEFAULT_BRUSH_COLOR,
  DEFAULT_GRID_LAYOUT_QUANTITATIVE,
  DEFAULT_GRID_LAYOUT_NOMINAL,
} from '../../../constants/views/common'
import { BRUSH_DEBOUNCE } from '../../../constants/debounce/debounce'

import { TopToolbar } from '../top-toolbar/TopToolbar'
import { ViewGrid } from '../views/ViewGrid'
import { EmptyData } from '../no-data/EmptyData'
import { Loading } from '../no-data/Loading'
import { getCategoryAttributesKeys, getDefaultQuantitativeAttributesKeys } from '../../../helpers/data/data'

export const DataContext: VoidFunctionComponent = () => {
  const [dataLoadState, setDataLoadState] = useState(DataLoadState.NoData)

  const [dataset, setDataset] = useState<ReadonlyArray<SelectableDataType> | null>(null)
  const [settings, setSettings] = useState<Settings>({})

  const [componentBrushing, setCurrentComponentBrushing] = useState<null | ViewType>(null)
  const [cleanBrushing, setCleanBrushing] = useState<SideEffectVoid[]>([])
  const [currentRedrawTime, setRedrawTime] = useState(Date.now())

  const redrawTime = useDebounce(currentRedrawTime, BRUSH_DEBOUNCE) // used for less component re-renders

  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false)
  const [isDetailsVisible, setIsDetailsVisible] = useState(true)
  const [isBrushingOnEndOfMove, setIsBrushingOnEndOfMove] = useState(false)

  const [isAddViewDialogOpen, setIsAddViewDialogOpen] = useState(false)
  const [layout, setLayout] = useState<GridLayoutItem[] | null>(null)
  const [brushColor, setBrushColor] = useState<string>(DEFAULT_BRUSH_COLOR)

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

  const setDatasetAndRemoveBrushing = useCallback((data: ReadonlyArray<SelectableDataType> | null) => {
    setSettings({})
    setDataset(data)
    setCurrentComponentBrushing(null)
  }, [])

  const refreshViews = useCallback((): void => {
    setRedrawTime(Date.now()) // redraw component
  }, [])

  const cleanAllBrushes = useCallback(
    (deletePrevSelection = true) => {
      if (dataset && deletePrevSelection) {
        dataset.forEach((data) => (data.selected = false))
        refreshViews()
      }
      cleanBrushingRef.current.forEach((f) => f())
    },
    [cleanBrushingRef, dataset, refreshViews],
  )

  const clearBrushesOnButton = useCallback(() => {
    setCurrentComponentBrushing(null)
    cleanAllBrushes()
  }, [cleanAllBrushes])

  const setComponentBrushing: SetComponentBrushing = useCallback(
    (newComponent) => {
      if (componentBrushingRef.current !== newComponent) {
        cleanAllBrushes(
          newComponent !== ViewType.DataTable &&
            newComponent !== ViewType.Glyphs &&
            newComponent !== ViewType.ParallelSetsBundled,
        )
      }
      setCurrentComponentBrushing(newComponent)
    },
    [cleanAllBrushes, componentBrushingRef],
  )

  const registerCleanBrushing = useCallback((cleanBrushing: SideEffectVoid) => {
    setCleanBrushing((prev) => [...prev, cleanBrushing])
  }, [])

  const cleanSelectedIfViewWasBrushing = useCallback(
    (component: ViewType) => {
      if (componentBrushingRef.current === component) {
        cleanAllBrushes()
        setCurrentComponentBrushing(null)
      }
    },
    [cleanAllBrushes, componentBrushingRef],
  )

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
      clearBrushes={clearBrushesOnButton}
      setDataset={setDatasetAndRemoveBrushing}
      setDataLoadState={setDataLoadState}
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

  if (!layout) return null

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
        isAddViewDialogOpen={isAddViewDialogOpen}
        setIsAddViewDialogOpen={setIsAddViewDialogOpen}
        layout={layout}
        setLayout={setLayout}
        brushColor={brushColor}
        registerCleanBrushing={registerCleanBrushing}
        setComponentBrushing={setComponentBrushing}
        refreshViews={refreshViews}
        redrawTime={redrawTime}
        isBrushingActive={componentBrushingRef.current !== null}
        isBrushingOnEndOfMove={isBrushingOnEndOfMove}
      />
    </>
  )
}

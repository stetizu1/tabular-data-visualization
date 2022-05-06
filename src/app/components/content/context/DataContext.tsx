import { useCallback, useMemo, useState, VoidFunctionComponent } from 'react'

import { SelectableDataType } from '../../../types/data/data'
import { SideEffectVoid } from '../../../types/basic/functionTypes'
import { SetComponentBrushing } from '../../../types/brushing/Brushable'

import { useUpdatedRef } from '../../../helpers/react/useUpdatedRef'

import { DataLoadState } from '../../../constants/data/dataLoadState'
import { ViewType } from '../../../constants/views/ViewTypes'

import { TopToolbar } from '../top-toolbar/TopToolbar'
import { ViewGrid } from '../views/ViewGrid'
import { Settings } from '../../../types/views/settings/Settings'
import { EmptyData } from '../no-data/EmptyData'
import { Loading } from '../no-data/Loading'
import { GridLayoutItem } from '../../../types/views/Grid'
import { DEFAULT_BRUSH_COLOR, DEFAULT_GRID_LAYOUT } from '../../../constants/views/common'

export const DataContext: VoidFunctionComponent = () => {
  const [dataLoadState, setDataLoadState] = useState(DataLoadState.NoData)

  const [dataset, setDataset] = useState<ReadonlyArray<SelectableDataType> | null>(null)
  const [settings, setSettings] = useState<Settings>({})

  const [componentBrushing, setCurrentComponentBrushing] = useState<null | ViewType>(null)
  const [cleanBrushing, setCleanBrushing] = useState<SideEffectVoid[]>([])
  const [redrawTime, setRedrawTime] = useState(Date.now())

  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false)
  const [isDetailsVisible, setIsDetailsVisible] = useState(true)
  const [isBrushingOnEndOfMove, setIsBrushingOnEndOfMove] = useState(false)

  const [isAddViewDialogOpen, setIsAddViewDialogOpen] = useState(false)
  const [layout, setLayout] = useState<GridLayoutItem[]>(DEFAULT_GRID_LAYOUT)
  const [brushColor, setBrushColor] = useState<string>(DEFAULT_BRUSH_COLOR)

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
        cleanAllBrushes(newComponent !== ViewType.DataTable && newComponent !== ViewType.Glyphs)
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

  const topToolbarComponent = useMemo(
    () => (
      <TopToolbar
        openDrawer={() => setDrawerOpen(true)}
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
    ),
    [
      brushColor,
      clearBrushesOnButton,
      componentBrushingRef,
      dataset,
      isBrushingOnEndOfMove,
      isDetailsVisible,
      setDatasetAndRemoveBrushing,
      setIsBrushingOnEndOfMoveAndRemoveBrushing,
    ],
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

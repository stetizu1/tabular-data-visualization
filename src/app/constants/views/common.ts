import { GridLayoutItem } from '../../types/views/Grid'
import { ViewType } from './ViewTypes'

export const VIEW_BORDER_SIZE = 5

export const DRAG_HANDLE = `drag-handle`

export const HEADER_HEIGHT = 30

export const VIEW_DEFAULT_SIZE = {
  width: 200,
  height: 200,
}

export const COLUMNS_COUNT = 25
export const ROW_HEIGHT = 10

export const DEFAULT_VIEW_DIMENSIONS: Record<ViewType, { w: number; h: number }> = {
  [ViewType.Glyphs]: {
    w: 12,
    h: 12,
  },
  [ViewType.ParallelCoordinates]: {
    w: 12,
    h: 16,
  },
  [ViewType.ScatterPlotGlyphs]: {
    w: 12,
    h: 20,
  },
  [ViewType.ScatterPlotMatrix]: {
    w: 14,
    h: 26,
  },
  [ViewType.DataTable]: {
    w: 18,
    h: 20,
  },
}

export const VIEW_LIMITS = {
  minW: 4,
  minH: 5,
}

export const DEFAULT_GRID_LAYOUT: GridLayoutItem[] = [
  {
    i: ViewType.ParallelCoordinates,
    w: 14,
    h: 17,
    x: 0,
    y: 0,
  },
  {
    i: ViewType.ScatterPlotMatrix,
    w: 11,
    h: 30,
    x: 14,
    y: 0,
  },
  {
    i: ViewType.Glyphs,
    w: 14,
    h: 13,
    x: 0,
    y: 17,
  },
].map((item) => ({ ...item, VIEW_LIMITS }))

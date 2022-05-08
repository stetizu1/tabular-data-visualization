import { GridLayoutItem } from '../../types/views/Grid'
import { Dimensions } from '../../types/basic/dimensions'
import { ViewType } from './ViewTypes'

export const DEFAULT_BRUSH_COLOR = `#830606`
export const DEFAULT_BRUSH_BG_COLOR_TABLE = `#ffcfcf`
export const DEFAULT_BRUSH_FONT_COLOR_TABLE = `#111111`

export const VIEW_BORDER_SIZE = 5

export const DRAG_HANDLE = `drag-handle`

export const HEADER_HEIGHT = 30

export const VIEW_DEFAULT_SIZE: Dimensions = {
  width: 0,
  height: 0,
}

export const COLUMNS_COUNT = 25
export const ROW_HEIGHT = 10

export const VIEW_LIMITS: Record<ViewType, Required<Pick<GridLayoutItem, `minW` | `minH`>>> = {
  [ViewType.ParallelCoordinates]: {
    minW: 4,
    minH: 8,
  },
  [ViewType.ScatterPlotMatrix]: {
    minW: 4,
    minH: 8,
  },
  [ViewType.Glyphs]: {
    minW: 4,
    minH: 6,
  },
  [ViewType.ScatterPlotGlyphs]: {
    minW: 4,
    minH: 8,
  },
  [ViewType.DataTable]: {
    minW: 4,
    minH: 10,
  },
  [ViewType.ParallelSetsBundled]: {
    minW: 4,
    minH: 8,
  },
}

export const DEFAULT_VIEW_DIMENSIONS: Record<ViewType, Required<Pick<GridLayoutItem, `w` | `h` | `minW` | `minH`>>> = {
  [ViewType.ParallelCoordinates]: {
    w: 12,
    h: 16,
    ...VIEW_LIMITS[ViewType.ParallelCoordinates],
  },
  [ViewType.ScatterPlotMatrix]: {
    w: 14,
    h: 26,
    ...VIEW_LIMITS[ViewType.ScatterPlotMatrix],
  },
  [ViewType.Glyphs]: {
    w: 12,
    h: 12,
    ...VIEW_LIMITS[ViewType.Glyphs],
  },
  [ViewType.ScatterPlotGlyphs]: {
    w: 12,
    h: 20,
    ...VIEW_LIMITS[ViewType.ScatterPlotGlyphs],
  },
  [ViewType.DataTable]: {
    w: 18,
    h: 20,
    ...VIEW_LIMITS[ViewType.DataTable],
  },
  [ViewType.ParallelSetsBundled]: {
    w: 12,
    h: 16,
    ...VIEW_LIMITS[ViewType.ParallelSetsBundled],
  },
}

export const DEFAULT_GRID_LAYOUT_QUANTITATIVE: GridLayoutItem[] = [
  {
    i: ViewType.ParallelCoordinates,
    w: 14,
    h: 17,
    x: 0,
    y: 0,
    ...VIEW_LIMITS[ViewType.ParallelCoordinates],
  },
  {
    i: ViewType.ScatterPlotMatrix,
    w: 11,
    h: 30,
    x: 14,
    y: 0,
    ...VIEW_LIMITS[ViewType.ScatterPlotMatrix],
  },
  {
    i: ViewType.Glyphs,
    w: 14,
    h: 13,
    x: 0,
    y: 17,
    ...VIEW_LIMITS[ViewType.Glyphs],
  },
]

export const DEFAULT_GRID_LAYOUT_NOMINAL: GridLayoutItem[] = [
  {
    i: ViewType.ParallelSetsBundled,
    w: 25,
    h: 25,
    x: 0,
    y: 0,
    ...VIEW_LIMITS[ViewType.ParallelSetsBundled],
  },
]

import { GridLayoutItem } from '../../types/views/Grid'
import { Dimensions } from '../../types/basic/dimensions'
import { ViewType } from './ViewType'

export const DEFAULT_BRUSH_COLOR = `#830606`
export const DEFAULT_BRUSH_BG_COLOR_TABLE = `#ffcfcf`
export const DEFAULT_BRUSH_FONT_COLOR_TABLE = `#111111`
export const DEFAULT_FONT_COLOR_PARALLEL_SETS = `#252525`

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
    h: 17,
    x: 0,
    y: 0,
    ...VIEW_LIMITS[ViewType.ParallelSetsBundled],
  },
  {
    i: ViewType.DataTable,
    w: 25,
    h: 13,
    x: 23,
    y: 0,
  },
]

export const LAYOUT_OPT_2: GridLayoutItem[] = [
  {
    i: ViewType.ParallelCoordinates,
    w: 30,
    h: 16,
    x: 0,
    y: 0,
    ...VIEW_LIMITS[ViewType.ParallelCoordinates],
  },
  {
    i: ViewType.ParallelSetsBundled,
    w: 30,
    h: 14,
    x: 17,
    y: 0,
    ...VIEW_LIMITS[ViewType.ParallelSetsBundled],
  },
]

export const LAYOUT_OPT_3: GridLayoutItem[] = [
  {
    i: ViewType.ParallelCoordinates,
    w: 14,
    h: 16,
    x: 0,
    y: 0,
    ...VIEW_LIMITS[ViewType.ParallelCoordinates],
  },
  {
    i: ViewType.ScatterPlotMatrix,
    w: 11,
    h: 20,
    x: 14,
    y: 0,
    ...VIEW_LIMITS[ViewType.ScatterPlotMatrix],
  },
  {
    i: ViewType.Glyphs,
    w: 11,
    h: 10,
    x: 14,
    y: 20,
    ...VIEW_LIMITS[ViewType.Glyphs],
  },
  {
    i: ViewType.ParallelSetsBundled,
    w: 14,
    h: 14,
    x: 0,
    y: 16,
    ...VIEW_LIMITS[ViewType.ParallelSetsBundled],
  },
]
export const LAYOUT_OPT_4: GridLayoutItem[] = [
  {
    i: ViewType.ParallelCoordinates,
    w: 14,
    h: 15,
    x: 11,
    y: 0,
    ...VIEW_LIMITS[ViewType.ParallelCoordinates],
  },
  {
    i: ViewType.ScatterPlotMatrix,
    w: 11,
    h: 30,
    x: 0,
    y: 0,
    ...VIEW_LIMITS[ViewType.ScatterPlotMatrix],
  },
  {
    i: ViewType.ScatterPlotGlyphs,
    w: 14,
    h: 15,
    x: 11,
    y: 15,
    ...VIEW_LIMITS[ViewType.ScatterPlotGlyphs],
  },
]

export const LAYOUT_OPTIONS = [
  DEFAULT_GRID_LAYOUT_QUANTITATIVE,
  DEFAULT_GRID_LAYOUT_NOMINAL,
  LAYOUT_OPT_2,
  LAYOUT_OPT_3,
  LAYOUT_OPT_4,
]

export const LAYOUT_IMAGES = [
  `/table-data-visualization/images/layout_0.png`,
  `/table-data-visualization/images/layout_1.png`,
  `/table-data-visualization/images/layout_2.png`,
  `/table-data-visualization/images/layout_3.png`,
  `/table-data-visualization/images/layout_4.png`,
]

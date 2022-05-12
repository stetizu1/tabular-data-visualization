import { Dimensions } from '../../types/basic/dimensions'
import { GridLayoutItem } from '../../types/views/Grid'
import { ViewType } from '../views-general/ViewType'

/**
 * Height of the grid item header panel
 */
export const GRID_ITEM_HEADER_HEIGHT = 30

/**
 * Class to give header panel to be draggable
 */
export const DRAG_HANDLE = `drag-handle`

/**
 * Default size of the view
 */
export const VIEW_DEFAULT_SIZE: Dimensions = {
  width: 0,
  height: 0,
}

/**
 * Count of layout columns
 */
export const COLUMNS_COUNT = 25

/**
 * Height of layout row
 */
export const ROW_HEIGHT = 10

/**
 * Minimal width/height limits for all views
 */
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
  [ViewType.ParallelSetsBundled]: {
    minW: 4,
    minH: 8,
  },
  [ViewType.DataTable]: {
    minW: 4,
    minH: 10,
  },
}

/**
 * Default dimensions for all views
 */
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
  [ViewType.ParallelSetsBundled]: {
    w: 12,
    h: 16,
    ...VIEW_LIMITS[ViewType.ParallelSetsBundled],
  },
  [ViewType.DataTable]: {
    w: 18,
    h: 20,
    ...VIEW_LIMITS[ViewType.DataTable],
  },
}

/**
 * Default grid layout for dataset with quantitative attributes
 */
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

/**
 * Default grid layout for dataset with nominal attributes
 */
export const DEFAULT_GRID_LAYOUT_NOMINAL: GridLayoutItem[] = [
  {
    i: ViewType.ParallelSetsBundled,
    w: 25,
    h: 20,
    x: 0,
    y: 0,
    ...VIEW_LIMITS[ViewType.ParallelSetsBundled],
  },
]

/**
 * Other layout options for dialog selection
 */
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

/**
 * Other layout options for dialog selection
 */
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

/**
 * Other layout options for dialog selection
 */
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

/**
 * Layout options for dialog selection
 */
export const LAYOUT_OPTIONS = [
  DEFAULT_GRID_LAYOUT_QUANTITATIVE,
  DEFAULT_GRID_LAYOUT_NOMINAL,
  LAYOUT_OPT_2,
  LAYOUT_OPT_3,
  LAYOUT_OPT_4,
]

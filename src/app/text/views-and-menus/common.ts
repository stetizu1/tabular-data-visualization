import { ViewType } from '../../constants/views/ViewTypes'

export const MENU_BASE_TEXT = {
  more: `More options`,
  empty: `-----`,
}

export const MENU_TEXT = {
  attributes: `Display attributes:`,
  category: `Colored by`,
  ...MENU_BASE_TEXT,
}

export const MARGIN_MENU_TEXT = {
  header: `Margin`,
  top: `Top`,
  right: `Right`,
  bottom: `Bottom`,
  left: `Left`,
}

export const OPACITY_MENU_TEXT = {
  all: `Brushing not active`,
  selected: `Selected`,
  notSelected: `Not selected`,
}

export const PALETTE_PICKER = {
  header: `Category colors`,
  categoriesLabel: [`c1`, `c2`, `c3`, `c4`, `c5`, `c6`, `c7`, `c8`, `c9`, `c10`],
}

export const VIEW_NAMES: Record<ViewType, string> = {
  [ViewType.ParallelCoordinates]: `Parallel Coordinates`,
  [ViewType.ScatterPlotMatrix]: `Scatter Plot Matrix`,
  [ViewType.Glyphs]: `Glyphs`,
  [ViewType.ScatterPlotGlyphs]: `Scatter Plot Glyphs`,
  [ViewType.DataTable]: `Data Table`,
}

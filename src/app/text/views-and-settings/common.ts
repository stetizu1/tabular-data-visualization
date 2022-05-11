import { ViewType } from '../../constants/views-general/ViewType'

export const SETTINGS_BASE_TEXT = {
  more: `More options`,
  empty: `-----`,
}

export const SETTINGS_TEXT = {
  attributes: `Display attributes:`,
  category: `Colored by`,
  ...SETTINGS_BASE_TEXT,
}

export const MARGIN_SETTINGS_TEXT = {
  header: `Margin`,
  top: `Top`,
  right: `Right`,
  bottom: `Bottom`,
  left: `Left`,
}

export const OPACITY_SETTINGS_TEXT = {
  all: `Brushing not active`,
  selected: `Selected`,
  notSelected: `Not selected`,
}

export const PALETTE_PICKER_TEXT = {
  header: `Category colors`,
  categoriesLabel: [`c1`, `c2`, `c3`, `c4`, `c5`, `c6`, `c7`, `c8`, `c9`, `c10`],
}

export const VIEW_NAMES: Record<ViewType, string> = {
  [ViewType.ParallelCoordinates]: `Parallel Coordinates`,
  [ViewType.ScatterPlotMatrix]: `Scatter Plot Matrix`,
  [ViewType.Glyphs]: `Glyphs`,
  [ViewType.ScatterPlotGlyphs]: `Scatter Plot Glyphs`,
  [ViewType.DataTable]: `Data Table`,
  [ViewType.ParallelSetsBundled]: `Parallel Sets (bundled layout)`,
}

interface InfoDialogText {
  description: string
  descriptionBrushing: string
  descriptionSettings: string
  descriptionSettingsMore: string
}

export const INFO_DIALOG_TEXT: Record<ViewType, InfoDialogText> = {
  [ViewType.ParallelCoordinates]: {
    description: `Parallel coordinates are used to display the values of quantitative attributes. Each axis corresponds to one attribute and its range is from the minimum to the maximum of its values. The individual items are then displayed as a polyline between these axes. To use this method, the dataset must contain at least two numeric attributes.`,
    descriptionBrushing: `Parallel coordinates use brushing on their axes. On them, you can drag to select the ranges that determine the selected items. Items that traverse all ranges are selected. Brushing is exclusive for parallel coordinates, so it deletes the selection from other views.`,
    descriptionSettings: `In the settings you can specify which attributes are displayed on the axes or change their order. You can also specify the nominal attribute according to which the individual polylines will be colored.`,
    descriptionSettingsMore: `In the detailed settings you can also change the margin of the internal svg (eg to reveal labels), the width of the polyline, the transparency when brushing or the colors for coloring with the nominal attribute.`,
  },
  [ViewType.ScatterPlotMatrix]: {
    description: ``,
    descriptionBrushing: ``,
    descriptionSettings: ``,
    descriptionSettingsMore: ``,
  },
  [ViewType.Glyphs]: {
    description: ``,
    descriptionBrushing: ``,
    descriptionSettings: ``,
    descriptionSettingsMore: ``,
  },
  [ViewType.ScatterPlotGlyphs]: {
    description: ``,
    descriptionBrushing: ``,
    descriptionSettings: ``,
    descriptionSettingsMore: ``,
  },
  [ViewType.DataTable]: {
    description: ``,
    descriptionBrushing: ``,
    descriptionSettings: ``,
    descriptionSettingsMore: ``,
  },
  [ViewType.ParallelSetsBundled]: {
    description: ``,
    descriptionBrushing: ``,
    descriptionSettings: ``,
    descriptionSettingsMore: ``,
  },
}

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
    descriptionBrushing: `Parallel coordinates use brushing on their axes. On them, you can drag to select the ranges that determine the selected items. Items that traverse all ranges are selected. Brushing is exclusive for parallel coordinates, so it deletes the previous selection from other views.`,
    descriptionSettings: `In the settings you can specify which attributes are displayed on the axes or change their order. You can also specify the nominal attribute according to which the individual polylines will be colored.`,
    descriptionSettingsMore: `In the detailed settings you can also change the margin of the internal svg (e.g. to reveal labels), the width of the polyline, the transparency when brushing or the colors for coloring with the nominal attribute.`,
  },
  [ViewType.ScatterPlotMatrix]: {
    description: `Scatter plot matrix are used to display the values of quantitative attributes. Attributes are assigned the rows and columns of the matrix so that each has exactly one row and one column of the same index. In the matrix, the value of the attribute is plotted on the y-axis in each row and on the x-axis in each column, so it creates scatter plot in every cell. Items are displayed in each of this scatter plot as data points.  To use this method, the dataset must contain at least two numeric attributes.`,
    descriptionBrushing: `Scatter plot matrix can use brushing in one of its cells. In the cell, select desired points with rectangle selection, in other scatter plots, selected points will be highlighted. Brushing is exclusive for scatter plot matrix, so it deletes the previous selection from other views.`,
    descriptionSettings: `In the settings you can specify which attributes are displayed in the matrix or change their order.  You can also specify the nominal attribute according to which the individual points will be colored.`,
    descriptionSettingsMore: `In the detailed settings you can also change the margin of the internal svg (e.g. to reveal labels), the size of the point, horizontal or vertical spacing between cells, the transparency when brushing or the colors for coloring with the nominal attribute.`,
  },
  [ViewType.Glyphs]: {
    description: `Glyphs are used to display the values of quantitative attributes. An axis is created for each attribute and these axes are arranged in a circle, gradually from the upper axis in a clockwise direction. Values are plotted on these axes so that the minima are close to the center and the maxima far from it. Glyphs are then sorted by one attribute and displayed in lines (as in text). To use this method, the dataset must contain at least three numeric attributes.`,
    descriptionBrushing: `Glyphs can use brushing by clicking on them. After clicking on an unselected glyph, it is added to the selection, if it is already selected, it is removed. Brushing is not exclusive for glyphs, so the previous selection is used.`,
    descriptionSettings: `In the settings you can specify which attributes are displayed on radial scales (on glyph), or change their order. You can also specify a nominal attribute to color individual glyphs and choose which attribute to use for sorting and whether to sort ascending or descending.`,
    descriptionSettingsMore: `In the detailed settings you can also change the margin of the internal svg (e.g. to reveal labels), the size of the glyph, spacing between glyphs, the transparency when brushing or the colors for coloring with the nominal attribute.`,
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

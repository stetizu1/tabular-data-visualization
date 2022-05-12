/**
 * Text on view top bar
 */
import { ViewType } from '../constants/views-general/ViewType'

export const VIEW_TOP_TEXT = {
  filter: `Filter`,
  save: `Save as SVG`,
  close: `Close`,
  glyphAxes: `Glyph axes from top, clockwise:`,
  saveDialog: {
    header: `Save to file`,
    description: `Do you want to save the visualization to an SVG file?`,
    confirm: `Save`,
    cancel: `Cancel`,
  },
  info: `Show view information`,
  infoDialog: {
    brushing: `Brushing`,
    settings: `Settings`,
    options: `Options`,
    close: `Close`,
  },
}

interface InfoDialogText {
  description: string
  descriptionBrushing: string
  descriptionSettings: string
  descriptionSettingsMore: string
}

/**
 * Texts of info dialogs for all views
 */
export const INFO_DIALOG_TEXT: Record<ViewType, InfoDialogText> = {
  [ViewType.ParallelCoordinates]: {
    description: `Parallel coordinates are used to display the values of quantitative attributes. Each axis corresponds to one attribute, and its range is from the minimum to the maximum of its values. The individual items are then displayed as a polyline between these axes. To use this method, the dataset must contain at least two numeric attributes.`,
    descriptionBrushing: `Parallel coordinates use brushing on their axes. On them, you can drag to select the ranges that determine the selected items. Items that traverse all ranges are selected. Brushing is exclusive for parallel coordinates, so it deletes the previous selection from other views.`,
    descriptionSettings: `In the settings you can specify which attributes are displayed on the axes or change their order. You can also specify the nominal attribute according to which the individual polylines will be colored.`,
    descriptionSettingsMore: `In the detailed settings you can also change the margin of the internal svg (e.g. to reveal labels), the width of the polyline, the transparency when brushing or the colors for coloring with the nominal attribute.`,
  },
  [ViewType.ScatterPlotMatrix]: {
    description: `The scatter plot matrix is used to display the values of quantitative attributes. Attributes are assigned to the rows and columns of the matrix so that each has exactly one row and one column of the same index. In the matrix, the value of the attribute is plotted on the y-axis in each row and on the x-axis in each column, so it creates a scatter plot in every cell. The items are displayed in each of these scatter plots as data points.  To use this method, the dataset must contain at least two numeric attributes.`,
    descriptionBrushing: `The scatter plot matrix uses brushing in one of its cells. In the cell, select desired points with rectangle selection; in other scatter plots, selected points will be highlighted. Brushing is exclusive for the scatter plot matrix, so it deletes the previous selection from other views.`,
    descriptionSettings: `In the settings you can specify which attributes are displayed in the matrix or change their order.  You can also specify the nominal attribute according to which the individual points will be colored.`,
    descriptionSettingsMore: `In the detailed settings you can also change the margin of the internal svg (e.g. to reveal labels), the size of the point, horizontal or vertical spacing between cells, the transparency when brushing, or the colors for coloring with the nominal attribute.`,
  },
  [ViewType.Glyphs]: {
    description: `Glyphs are used to display the values of quantitative attributes. An axis is created for each attribute, and these axes are arranged in a circle, gradually from the upper axis in a clockwise direction. Values are plotted on these axes so that the minima are close to the center and the maxima are far from it. The glyphs are then sorted by one attribute and displayed in lines (as in text). To use this method, the dataset must contain at least three numeric attributes.`,
    descriptionBrushing: `Glyphs use brushing by clicking on them. After clicking on an unselected glyph, it is added to the selection; if it is already selected, it is removed. Brushing is not exclusive for glyphs, so the previous selection is used.`,
    descriptionSettings: `In the settings you can specify which attributes are displayed on radial scales (on glyph), or change their order. You can also specify a nominal attribute to color individual glyphs and choose which attribute to use for sorting and whether to sort ascending or descending.`,
    descriptionSettingsMore: `In the detailed settings you can also change the margin of the internal svg, the size of the glyph, spacing between glyphs, the transparency when brushing, or the colors for coloring with the nominal attribute.`,
  },
  [ViewType.ScatterPlotGlyphs]: {
    description: `Scatter plot glyphs are used to display the values of quantitative attributes. An axis is created for each attribute, and these axes are arranged in a circle, gradually from the upper axis in a clockwise direction. Values are plotted on these axes so that the minima are close to the center and the maxima are far from it. Two attributes are used for the x and y axes, and the glyphs are then positioned according to the values of these attributes. To use this method, the dataset must contain at least three numeric attributes.`,
    descriptionBrushing: `Scatter plot glyphs use brushes in the form of a rectangular selection; glyphs are selected if their center is inside it. Brushing is exclusive for scatter plot glyphs, so it deletes the previous selection from other views.`,
    descriptionSettings: `In the settings you can specify which attributes are displayed on radial scales (on glyph), or change their order. You can select the attributes to be used for the x-axis and y-axis. You can also specify a nominal attribute to color individual glyphs.`,
    descriptionSettingsMore: `In the detailed settings you can also change the margin of the internal svg (e.g. to reveal labels), the size of the glyph, the transparency when brushing, or the colors for coloring with the nominal attribute.`,
  },
  [ViewType.ParallelSetsBundled]: {
    description: `Parallel sets (bundled) are used to display the ratios of the nominal attribute values. Each axis corresponds to one nominal attribute and is divided into parts according to the possible values of the attribute. The length of the parts is then determined by the ratio of the values to the total number of items. From these parts, the curves lead to parts of adjacent axes, with thickness according to the ratio of items that have both values of the attributes, relative to the length of the part. To use this method, the dataset must contain at least two nominal attributes.`,
    descriptionBrushing: `Parallel sets use brushing on their axes by clicking on parts with specific values. When you click on this section, the highlighted ratios with this value will be displayed on each curve. If the part is already selected (the line is brushed - colored), all items with this value are removed from the selection and are thus also removed from the ratios. This allows various Boolean operations by this brushing. Brushing is not exclusive for parallel sets, so the previous selection is used.`,
    descriptionSettings: `In the settings you can specify which attributes are displayed on the axes or change their order. You can also specify the nominal attribute according to which the individual curves will be divided (with their value ratio) and colored, and you can choose whether brushing will be displayed over the curves or in the top part.`,
    descriptionSettingsMore: `In the detailed settings you can also change the margin of the internal svg (e.g. to reveal labels), the width of the tabs, horizontal spacing between tabs, vertical gaps between tabs, color of inner value font, the transparency when brushing, or the colors for coloring with the nominal attribute.`,
  },
  [ViewType.DataTable]: {
    description: `The data table is used to display the values of all attributes. Items are displayed in rows; they can be filtered (the filter can be turned on in the view top bar), sorted by any attribute (by clicking on the arrow next to the label, also by selected) ascending or descending.`,
    descriptionBrushing: `The table allows brushing using the check box in the row. The table also has a Select All checkbox, which selects/deselects all values that pass filters when clicked. Brushing is not exclusive for the data table, so the previous selection is used.`,
    descriptionSettings: `In the settings you can specify which attributes are displayed in the columns or change their order.`,
    descriptionSettingsMore: `In the detailed settings you can also change the table row height, selected background color, and selected font color.`,
  },
}

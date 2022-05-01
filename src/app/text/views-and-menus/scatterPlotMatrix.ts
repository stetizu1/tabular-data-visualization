import { ViewType } from '../../constants/views/ViewTypes'
import { MENU_TEXT, VIEW_NAMES } from './common'

export const SCATTER_PLOT_MATRIX_TEXT = {
  unavailable: `Scatter plot cannot be displayed with a single attribute. To generate a scatter plot, select multiple attributes from the menu.`,
}

export const SCATTER_PLOT_MATRIX_MENU_TEXT = {
  header: VIEW_NAMES[ViewType.ScatterPlotMatrix],
  unavailable: `The scatter plot matrix plot cannot be used while data has less than 2 numerical attributes. Try to use different type of visualization that fits your data.`,
  opacity: `Opacity of data points`,
  pointSize: `Point size`,
  ...MENU_TEXT,
}

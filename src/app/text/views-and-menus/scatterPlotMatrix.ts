import { ViewType } from '../../constants/views/ViewType'
import { MENU_TEXT, VIEW_NAMES } from './common'

export const SCATTER_PLOT_MATRIX_TEXT = {
  tooSmall: `Scatter plot cannot be displayed, window is too small. Change the size, number of attributes displayed or margin to display scatter plot matrix`,
  unavailable: `Scatter plot cannot be displayed with a single attribute. To generate a scatter plot, select multiple attributes from the menu.`,
}

export const SCATTER_PLOT_MATRIX_MENU_TEXT = {
  header: VIEW_NAMES[ViewType.ScatterPlotMatrix],
  sizes: `Sizes`,
  unavailable: `The scatter plot matrix plot cannot be used while data has less than 2 numerical attributes. Try to use different type of visualization that fits your data.`,
  opacity: `Opacity of data points`,
  pointSize: `Point size`,
  horizontalSpacing: `Horizontal spacing`,
  verticalSpacing: `Vertical spacing`,
  ...MENU_TEXT,
}

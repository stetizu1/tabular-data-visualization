import { ViewType } from '../../constants/views-general/ViewType'

import { SETTINGS_TEXT, VIEW_NAMES } from './common'

export const SCATTER_PLOT_MATRIX_TEXT = {
  tooSmall: `Scatter plot cannot be displayed, window is too small. Change the size, number of attributes displayed or margin to display scatter plot matrix`,
  unavailable: `Scatter plot cannot be displayed with a single attribute. To generate a scatter plot, select multiple attributes from settings.`,
}

export const SCATTER_PLOT_MATRIX_SETTINGS_TEXT = {
  header: VIEW_NAMES[ViewType.ScatterPlotMatrix],
  sizes: `Sizes`,
  unavailable: `The scatter plot matrix plot cannot be used while data has less than 2 numerical attributes. Try to use different type of visualization that fits your data.`,
  opacity: `Opacity of data points`,
  pointSize: `Point size`,
  horizontalSpacing: `Horizontal spacing`,
  verticalSpacing: `Vertical spacing`,
  ...SETTINGS_TEXT,
}

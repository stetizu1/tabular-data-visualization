/**
 * Text for scatter plot matrix
 */
import { ViewType } from '@/constants/views-general/ViewType'

import { VIEWS_NAMES } from '../viewsNames'
import { SETTINGS_TEXT } from './common'

/**
 * Text in scatter plot matrix
 */
export const SCATTER_PLOT_MATRIX_TEXT = {
  tooSmall: `The scatter plot cannot be displayed because the window is too small. Change the size, number of attributes displayed, or margin to display scatter plot matrix.`,
  unavailable: `The scatter plot cannot be displayed with a single attribute. To generate a scatter plot, select multiple attributes from the settings.`,
}

/**
 * Text in scatter plot matrix settings
 */
export const SCATTER_PLOT_MATRIX_SETTINGS_TEXT = {
  header: VIEWS_NAMES[ViewType.ScatterPlotMatrix],
  sizes: `Sizes`,
  unavailable: `The scatter plot matrix plot cannot be used while data have less than 2 numerical attributes. Try to use different type of visualization that fits your data.`,
  opacity: `Opacity of data points`,
  pointSize: `Point size`,
  horizontalSpacing: `Horizontal spacing`,
  verticalSpacing: `Vertical spacing`,
  ...SETTINGS_TEXT,
}

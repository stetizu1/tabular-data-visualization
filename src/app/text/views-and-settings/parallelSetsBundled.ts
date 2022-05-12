/**
 * Text for parallel sets (bundled)
 */
import { ViewType } from '../../constants/views-general/ViewType'

import { VIEWS_NAMES } from '../viewsNames'
import { SETTINGS_TEXT } from './common'

/**
 * Text in parallel sets settings
 */
export const PARALLEL_SETS_BUNDLED_TEXT = {
  unavailable: `The parallel sets plot cannot be displayed with a single attribute. To generate a parallel sets plot, select multiple attributes from the settings.`,
}

/**
 * Text in parallel sets settings settings
 */
export const PARALLEL_SETS_SETTINGS_TEXT = {
  header: VIEWS_NAMES[ViewType.ParallelSetsBundled],
  unavailable: `The parallel sets plot cannot be used while data have less than 2 nominal attributes. Try to use different type of visualization that fits your data.`,
  opacity: `Opacity of connectors`,
  tabWidth: `Width of the tabs`,
  tabSpacing: `Spacing between tabs`,
  tabGap: `Gap between tabs`,
  brushing: `Brushing...`,
  fontColor: `Inner font color`,
  ...SETTINGS_TEXT,
}

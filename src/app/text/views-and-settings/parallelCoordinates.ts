/**
 * Text for parallel coordinates
 */
import { ViewType } from '../../constants/views-general/ViewType'

import { VIEWS_NAMES } from '../viewsNames'
import { SETTINGS_TEXT } from './common'

/**
 * Text in parallel coordinates
 */
export const PARALLEL_COORDINATES_TEXT = {
  unavailable: `The parallel coordinates plot cannot be displayed with a single attribute. To generate a parallel coordinates plot, select multiple attributes from the settings.`,
}

/**
 * Text in parallel coordinates settings
 */
export const PARALLEL_COORDINATES_SETTINGS_TEXT = {
  header: VIEWS_NAMES[ViewType.ParallelCoordinates],
  unavailable: `The parallel coordinates plot cannot be used while data have less than 2 numerical attributes. Try to use different type of visualization that fits your data.`,
  opacity: `Opacity of lines`,
  lineWidth: `Line width`,
  ...SETTINGS_TEXT,
}

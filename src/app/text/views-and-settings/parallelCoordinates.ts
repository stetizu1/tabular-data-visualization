import { ViewType } from '../../constants/views-general/ViewType'

import { SETTINGS_TEXT, VIEW_NAMES } from './common'

export const PARALLEL_COORDINATES_TEXT = {
  unavailable: `The parallel coordinates plot cannot be displayed with a single attribute. To generate a parallel coordinates plot, select multiple attributes from the settings.`,
}

export const PARALLEL_COORDINATES_SETTINGS_TEXT = {
  header: VIEW_NAMES[ViewType.ParallelCoordinates],
  unavailable: `The parallel coordinates plot cannot be used while data have less than 2 numerical attributes. Try to use different type of visualization that fits your data.`,
  opacity: `Opacity of lines`,
  lineWidth: `Line width`,
  ...SETTINGS_TEXT,
}

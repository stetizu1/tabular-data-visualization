import { ViewType } from '../../constants/views-general/ViewType'

import { MENU_TEXT, VIEW_NAMES } from './common'

export const PARALLEL_COORDINATES_TEXT = {
  unavailable: `Parallel coordinates plot cannot be displayed with a single attribute. To generate a parallel coordinates plot, select multiple attributes from settings.`,
}

export const PARALLEL_COORDINATES_MENU_TEXT = {
  header: VIEW_NAMES[ViewType.ParallelCoordinates],
  unavailable: `The parallel coordinates plot cannot be used while data has less than 2 numerical attributes. Try to use different type of visualization that fits your data.`,
  opacity: `Opacity of lines`,
  lineWidth: `Line width`,
  ...MENU_TEXT,
}

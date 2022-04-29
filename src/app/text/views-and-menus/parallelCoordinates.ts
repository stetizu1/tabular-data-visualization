import { MENU_TEXT } from './common'

export const PARALLEL_COORDINATES_TEXT = {
  unavailable: `Parallel coordinates plot cannot be displayed with a single attribute. To generate a parallel coordinates plot, select multiple attributes from the menu.`,
}

export const PARALLEL_COORDINATES_MENU_TEXT = {
  header: `Parallel Coordinates`,
  unavailable: `The parallel coordinates plot cannot be used while data has less than 2 numerical attributes. Try to use different type of visualization that fits your data.`,
  opacity: `Opacity of lines`,
  lineWidth: `Line width`,
  ...MENU_TEXT,
}

import { ViewType } from '../../constants/views/ViewTypes'
import { MENU_TEXT, VIEW_NAMES } from './common'

export const PARALLEL_SETS_BUNDLED_TEXT = {
  unavailable: `Parallel sets plot cannot be displayed with a single attribute. To generate a parallel sets plot, select multiple attributes from the menu.`,
}

export const PARALLEL_SETS_MENU_TEXT = {
  header: VIEW_NAMES[ViewType.ParallelSetsBundled],
  unavailable: `The parallel sets plot cannot be used while data has less than 2 nominal attributes. Try to use different type of visualization that fits your data.`,
  opacity: `Opacity of connectors`,
  tabWidth: `Width of the tabs`,
  tabSpacing: `Spacing between tabs`,
  tabGap: `Gap between tabs`,
  coloringType: `Coloring from...`,
  brushing: `Brushing...`,
  fontColor: `Inner font color`,
  ...MENU_TEXT,
}

/**
 * Visualization view interface
 */

import { Dimensions } from '../basic/dimensions'
import { SelectableDataType } from '../data/data'

/**
 * Interface for every view window. It assigns dimensions (width, height) dataset and if details are visible to the view.
 */
export interface VisualizationView extends Dimensions {
  /**
   * Array of rows from loaded tabular data with selected flag. It should be immutable in views, with the exception of selected attribute
   */
  dataset: ReadonlyArray<SelectableDataType>

  /**
   * True if data details (tooltip) are visible on hover
   */
  isDetailsVisible?: boolean
}

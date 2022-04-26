import { SelectableDataType } from '../data/data'
import { MarginArray } from '../styling/Margin'
import { Dimensions } from '../basic/dimensions'

/**
 * Interface for every view window. It assigns dimensions (width, height) and a dataset to the view.
 */
export interface VisualizationView extends Dimensions {
  /**
   * Array of rows from loaded tabular data with selected flag. It should be immutable in views, with the exception of selected attribute
   */
  dataset: ReadonlyArray<SelectableDataType>
  /**
   * View margin inside svg
   */
  margins?: MarginArray
}

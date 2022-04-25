import { SelectableDataType } from '../data/data'

/**
 * Interface for every view window. It assigns dimensions (width, height) and a dataset to the view.
 */
export interface VisualizationView {
  /**
   * Array of rows from loaded tabular data with selected flag. It should be immutable in views, with the exception of selected attribute
   */
  dataset: ReadonlyArray<SelectableDataType>
  /**
   * Width of view window
   */
  width: number
  /**
   * Height of view window
   */
  height: number
  /**
   * View margin inside svg
   */
  margins?: [number, number, number, number]
}

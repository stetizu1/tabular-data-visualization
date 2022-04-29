import { SelectableDataType } from '../data/data'
import { MarginArray } from '../styling/Margin'

/**
 * General settings for quantitative visualization
 */
export interface QuantitativeVisualizationSettings {
  /**
   * Attributes that will be used to create visualization
   */
  displayAttributes: Array<keyof SelectableDataType>
  /**
   * Array of colors for category attributes
   */
  colorCategory: ReadonlyArray<string>
  /**
   * Category attribute for coloring
   */
  categoryAttribute: keyof SelectableDataType | undefined

  /**
   * View margin inside svg
   */
  margins: MarginArray
}

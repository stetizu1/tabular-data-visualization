/**
 * Bases for visualization settings
 */

import { SelectableDataType } from '../../data/data'
import { ColorArray } from '../../styling/ColorArray'
import { MarginArray } from '../../styling/Margin'
import { Opacity } from '../../styling/Opacity'

/**
 * General settings for any visualization
 */
export interface VisualizationSettings {
  /**
   * Attributes that will be used to create visualization
   */
  displayAttributes: Array<keyof SelectableDataType>
}

/**
 * General settings for visualization with d3.js
 */
export interface ViewVisualizationSettings extends VisualizationSettings {
  /**
   * Category attribute for coloring
   */
  categoryAttribute: keyof SelectableDataType | undefined

  /**
   * Array of colors for category attributes
   */
  colorCategory: ColorArray

  /**
   * View margin inside svg
   */
  margins: MarginArray

  /**
   * Opacity of data items
   */
  opacity: Opacity
}

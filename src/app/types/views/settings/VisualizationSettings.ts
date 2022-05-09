import { SelectableDataType } from '../../data/data'
import { MarginArray } from '../../styling/Margin'
import { Opacity } from '../../styling/Opacity'
import { ColorArray } from '../../styling/ColorArray'

export interface VisualizationSettings {
  /**
   * Attributes that will be used to create visualization
   */
  displayAttributes: Array<keyof SelectableDataType>
}

/**
 * General settings for visualization with d3.js
 */
export interface BaseViewVisualizationSettings extends VisualizationSettings {
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

/**
 * General settings for quantitative visualization
 */
export interface ViewVisualizationSettings extends BaseViewVisualizationSettings {
  /**
   * Category attribute for coloring
   */
  categoryAttribute: keyof SelectableDataType | undefined
}

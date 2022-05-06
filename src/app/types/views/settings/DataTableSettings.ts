import { VisualizationSettings } from './VisualizationSettings'

export const rowHeightKey = `rowHeight`
export const selectedBackgroundColorKey = `selectedBackgroundColor`
export const selectedFontColorKey = `selectedFontColor`

/**
 * Settings for Data Table view
 */
export interface DataTableSettings extends VisualizationSettings {
  /**
   * Height of the table row
   */
  [rowHeightKey]: number

  /**
   * Selected background color
   */
  [selectedBackgroundColorKey]: string
  /**
   * Selected font color
   */
  [selectedFontColorKey]: string
}

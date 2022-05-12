/**
 * Settings for data table
 */
import { VisualizationSettings } from './VisualizationSettings'

// keys for additional attributes
export const rowHeightKey = `rowHeight`
export const selectedBackgroundColorKey = `selectedBackgroundColor`
export const selectedFontColorKey = `selectedFontColor`

/**
 * Settings for data table view
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

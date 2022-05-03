import { VisualizationSettings } from './VisualizationSettings'

export const rowHeightKey = `rowHeight`
/**
 * Settings for Data Table view
 */
export interface DataTableSettings extends VisualizationSettings {
  /**
   * Height of the table row
   */
  [rowHeightKey]: number
}

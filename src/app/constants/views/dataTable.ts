import { DataTableSettings } from '@/types/views/settings/DataTableSettings'

import { DEFAULT_BRUSH_BG_COLOR_TABLE, DEFAULT_BRUSH_FONT_COLOR_TABLE } from '../views-general/defaultSettableColors'

/**
 * Minimal attribute count for data table
 */
export const MIN_DATA_TABLE_ATTRIBUTE_COUNT = 1

/**
 * Default values for data table settings
 */
export const DATA_TABLE_DEFAULT: Pick<
  DataTableSettings,
  `rowHeight` | `selectedBackgroundColor` | `selectedFontColor`
> = {
  rowHeight: 45,
  selectedBackgroundColor: DEFAULT_BRUSH_BG_COLOR_TABLE,
  selectedFontColor: DEFAULT_BRUSH_FONT_COLOR_TABLE,
}

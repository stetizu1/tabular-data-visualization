/**
 * Text for data table
 */
import { ViewType } from '../../constants/views-general/ViewType'
import { SortType } from '../../constants/sort/SortType'

import { VIEWS_NAMES } from '../viewsNames'
import { SETTINGS_BASE_TEXT } from './common'

/**
 * Text in data table
 */
export const DATA_TABLE_SETTINGS_TEXT = {
  header: VIEWS_NAMES[ViewType.DataTable],
  unavailable: `The dataset seems to have less than one attribute, which makes it invalid. Please, choose different dataset.`,
  attributes: `Display columns`,
  rowHeight: `Table row height`,
  selectedBackgroundColor: `Selected background color`,
  selectedFontColor: `Selected font color`,
  ...SETTINGS_BASE_TEXT,
}

/**
 * Text in data table settings
 */
export const DATA_TABLE_TEXT = {
  checkboxTooltip: `Select all`,
  [SortType.asc]: `Sort ascending`,
  [SortType.desc]: `Sort descending`,
  unavailable: `The Data Table view cannot be displayed without attributes. To generate a Data Table view, select more attributes from the settings.`,
}

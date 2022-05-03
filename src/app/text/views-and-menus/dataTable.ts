import { ViewType } from '../../constants/views/ViewTypes'
import { OrderType } from '../../helpers/data/comparator'
import { MENU_BASE_TEXT, VIEW_NAMES } from './common'

export const DATA_TABLE_MENU_TEXT = {
  header: VIEW_NAMES[ViewType.DataTable],
  unavailable: `The dataset seems to have less than one attribute, which makes him not valid. Please choose different dataset.`,
  attributes: `Display columns`,
  rowHeight: `Table row height`,
  ...MENU_BASE_TEXT,
}

export const DATA_TABLE_TEXT = {
  checkboxTooltip: `Select all`,
  [OrderType.asc]: `Sort ascendant`,
  [OrderType.desc]: `Sort descendant`,
  unavailable: `The Data Table view cannot be displayed without attributes. To generate a Data Table view, select more attributes from the menu.`,
}

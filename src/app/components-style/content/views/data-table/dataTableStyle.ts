import { SxProps } from '@mui/system'

import { calc, important, px } from '../../../../helpers/stringGetters'

import { TABLE_COLORS } from '../../../../styles/colors'

export const getDataTableRowStyle = (
  rowHeight: number,
  selected: boolean,
  selectedBackgroundColor: string,
  selectedFontColor: string,
): SxProps => ({
  height: rowHeight,
  bgcolor: selected ? important(selectedBackgroundColor) : ``,
  '& .MuiTableCell-root': {
    color: selected ? important(selectedFontColor) : ``,
  },
  '& .MuiTableCell-root, .MuiCheckbox-root': {
    paddingTop: 0,
    paddingBottom: 0,
  },
})

export const dataTableStyle: Record<string, SxProps> = {
  tableHead: {
    bgcolor: TABLE_COLORS.headerBackground,
  },
  tableHeadRow: {
    height: 30,
    fontWeight: `bold`,
    '& .MuiTableCell-root, .MuiCheckbox-root': {
      color: TABLE_COLORS.headerFont,
    },
    '& .MuiTableSortLabel-root.Mui-active, .MuiTableSortLabel-root:hover, .MuiTableSortLabel-icon': {
      color: important(TABLE_COLORS.headerFontActive),
    },
  },
  tableBody: {
    bgcolor: TABLE_COLORS.rowsBackground,
  },
  filterRow: {
    bgcolor: TABLE_COLORS.filterBackground,
  },
  filterCell: {
    padding: px(5),
  },
  filter: {
    width: `90%`,
    bgcolor: TABLE_COLORS.rowsBackground,
    borderRadius: px(5),
    '&.MuiFormControl-root': {
      margin: 0,
    },
    '& input': {
      padding: px(5, 10, 4),
    },
  },
  filterIcon: {
    paddingLeft: px(12),
    color: TABLE_COLORS.filterIconFont,
  },
  notDisplayed: {
    padding: 10,
  },
  checkboxAll: {
    display: `flex`,
    height: calc(-10, `100%`),
    padding: px(5),
  },
}

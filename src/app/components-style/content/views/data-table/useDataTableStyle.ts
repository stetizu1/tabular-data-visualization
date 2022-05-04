import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material'
import { PLOT_COLORS, TABLE_COLORS } from '../../../../styles/colors'
import { important } from '../../../../helpers/d3/stringGetters'

export interface StyleProps {
  rowHeight: number
}

export const useDataTableStyle = makeStyles<Theme, StyleProps>({
  tableHead: {
    height: 30,
    background: TABLE_COLORS.headerBackground,
    fontWeight: `bold`,
    '& .MuiTableCell-root, .MuiCheckbox-root': {
      color: important(TABLE_COLORS.headerFont),
    },
    '& .Mui-active, .MuiSvgIcon-root': {
      color: important(TABLE_COLORS.headerFontActive),
    },
  },
  tableBody: {
    background: TABLE_COLORS.rowsBackground,
  },
  tableRow: {
    height: ({ rowHeight }) => rowHeight,
    '& .MuiTableCell-root, .MuiCheckbox-root': {
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
  notDisplayed: {
    padding: 10,
  },
  selected: {
    background: important(PLOT_COLORS.brushColorTable),
  },
})

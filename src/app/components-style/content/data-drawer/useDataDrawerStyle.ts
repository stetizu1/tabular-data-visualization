import { makeStyles } from '@mui/styles'

import { calc, border, px } from '../../../helpers/d3/stringGetters'
import { DATA_DRAWER_COLORS, ERROR_COLORS } from '../../../styles/colors'
import { DATA_DRAWER_FONT } from '../../../styles/font'

export const useDataDrawerStyle = makeStyles({
  drawer: {
    width: px(250),
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      background: DATA_DRAWER_COLORS.background,
      width: px(250),
      alignItems: `flex-end`,
      border: border(1, DATA_DRAWER_COLORS.border),
    },
    '& hr': {
      width: `100%`,
    },
  },
  header: {},
  chevron: {
    color: DATA_DRAWER_COLORS.icon,
  },
  menu: {
    width: `100%`,
    display: `flex`,
    flexDirection: `column`,
    flexGrow: 1,
  },
  drawerItem: {
    width: calc(-20, `100%`),
    padding: px(10),
    display: `flex`,
    flexDirection: `column`,
    textAlign: `left`,
    background: DATA_DRAWER_COLORS.drawerItemBackground,
    borderBottom: border(1, DATA_DRAWER_COLORS.drawerItemBorder),
    '& h1': {
      borderBottom: border(1, DATA_DRAWER_COLORS.drawerItemBorder),
      fontSize: DATA_DRAWER_FONT.headerFontSize,
      width: `100%`,
    },
    '& label': {
      fontSize: DATA_DRAWER_FONT.labelFontSize,
      color: DATA_DRAWER_COLORS.label,
    },
    '& .MuiFormControlLabel-root': {
      padding: px(2, 10),
    },
    '& .MuiCheckbox-root ': {
      padding: 0,
    },
    '& > div': {
      marginTop: px(10),
    },
  },
  insufficientAttributeNum: {
    padding: 10,
    fontSize: DATA_DRAWER_FONT.fontSize,
    color: ERROR_COLORS.font,
  },
})

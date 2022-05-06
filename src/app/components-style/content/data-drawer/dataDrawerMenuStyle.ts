import { SxProps } from '@mui/system'

import { calc, border, px } from '../../../helpers/d3/stringGetters'
import { DATA_DRAWER_COLORS, ERROR_COLORS } from '../../../styles/colors'
import { DATA_DRAWER_FONT } from '../../../styles/font'

export const dataDrawerMenuStyle: Record<string, SxProps> = {
  drawerMenu: {
    width: calc(-20, `100%`),
    padding: px(10),
    display: `flex`,
    flexDirection: `column`,
    textAlign: `left`,
    bgcolor: DATA_DRAWER_COLORS.drawerItemBackground,
    borderBottom: border(1, DATA_DRAWER_COLORS.drawerItemBorder),
    '& h1': {
      borderBottom: border(1, DATA_DRAWER_COLORS.drawerItemBorder),
      fontSize: DATA_DRAWER_FONT.headerFontSize,
      width: `100%`,
    },
    '& hr': {
      margin: px(4, 0, 3),
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
    padding: px(10),
    fontSize: DATA_DRAWER_FONT.fontSize,
    color: ERROR_COLORS.font,
  },
  accordion: {
    '&.MuiPaper-root': {
      borderRadius: 0,
    },
    '& .MuiButtonBase-root': {
      minHeight: 0,
      bgcolor: DATA_DRAWER_COLORS.drawerItemBackgroundDimmed,
      '&.Mui-expanded': {
        minHeight: 0,
      },
    },
    '& .MuiAccordionSummary-content': {
      margin: px(2, 0, 5),
      '&.Mui-expanded': {
        margin: px(2, 0, 5),
      },
    },
    '& .MuiAccordionDetails-root': {
      padding: 0,
      '& > *:not(hr)': {
        padding: px(5, 7),
      },
    },
  },
}

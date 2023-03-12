import { SxProps } from '@mui/system'

import { border, calc, px } from '@/helpers/stringGetters'

import { ERROR_COLORS, SETTINGS_DRAWER_COLORS } from '@/styles/colors'

export const settingsDrawerItemStyle: Record<string, SxProps> = {
  drawerSettings: {
    width: calc(-22, `100%`),
    padding: px(10),
    display: `flex`,
    flexDirection: `column`,
    textAlign: `left`,
    bgcolor: SETTINGS_DRAWER_COLORS.drawerItemBackground,
    border: border(1, SETTINGS_DRAWER_COLORS.drawerItemBorder),
    borderRadius: px(4),
    borderBottom: border(2, SETTINGS_DRAWER_COLORS.drawerItemBorder),
    '& h1': {
      borderBottom: border(1, SETTINGS_DRAWER_COLORS.drawerItemBorder),
      fontSize: 15,
      width: `100%`,
    },
    '& hr': {
      margin: px(4, 0, 3),
    },
    '& label': {
      fontSize: `0.8em`,
      color: SETTINGS_DRAWER_COLORS.label,
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
    fontSize: px(12),
    color: ERROR_COLORS.font,
  },
  accordion: {
    '&.MuiPaper-root': {
      borderRadius: 0,
    },
    '& .MuiButtonBase-root': {
      minHeight: 0,
      bgcolor: SETTINGS_DRAWER_COLORS.drawerItemBackgroundDimmed,
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

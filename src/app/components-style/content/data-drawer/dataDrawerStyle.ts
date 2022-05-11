import { SxProps } from '@mui/system'

import { border, calc, px } from '../../../helpers/stringGetters'

import { DATA_DRAWER_COLORS } from '../../../styles/colors'

export const dataDrawerStyle: Record<string, SxProps> = {
  drawer: {
    width: px(250),
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      bgcolor: DATA_DRAWER_COLORS.background,
      width: px(250),
      alignItems: `flex-end`,
      border: border(1, DATA_DRAWER_COLORS.border),
    },
    '& hr': {
      width: `100%`,
    },
    '& .MuiSelect-select': {
      padding: px(10, 12, 8),
    },
  },
  fill: {
    flexGrow: 1,
  },
  header: {},
  chevron: {
    color: DATA_DRAWER_COLORS.icon,
  },
  setting: {
    width: `100%`,
    display: `flex`,
    flexDirection: `column`,
    flexGrow: 1,
  },
  footer: {
    width: calc(-20, `100%`),
    padding: px(10),
  },
  githubIcon: {
    paddingRight: px(6),
    fontSize: px(18),
  },
  text: {
    color: DATA_DRAWER_COLORS.icon,
    fontSize: px(9),
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
  },
}

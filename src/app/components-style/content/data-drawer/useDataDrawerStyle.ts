import { makeStyles } from '@mui/styles'

import { border, px } from '../../../helpers/d3/stringGetters'
import { DATA_DRAWER_COLORS } from '../../../styles/colors'

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
})

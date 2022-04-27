import { makeStyles } from '@mui/styles'

import { calc, border, px } from '../../../helpers/d3/stringGetters'

export const useDataDrawerStyle = makeStyles({
  drawer: {
    width: px(250),
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      backgroundColor: `#23262d`,
      width: px(250),
      alignItems: `flex-end`,
      border: border(1, `#363a46`),
    },
    '& hr': {
      width: `100%`,
    },
  },
  header: {},
  chevron: {
    color: `#c4cbdc`,
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
    backgroundColor: `#edf1fd`,
    borderBottom: border(1, `#8e94a2`),
    '& h1': {
      borderBottom: border(1, `#8e94a2`),
      fontSize: px(14),
      width: `100%`,
    },
    '& label': {
      fontSize: `0.8em`,
      color: `#404242`,
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
    fontSize: 12,
    color: `#700000`,
  },
})

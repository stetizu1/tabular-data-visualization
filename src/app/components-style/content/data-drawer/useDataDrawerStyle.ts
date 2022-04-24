import { makeStyles } from '@mui/styles'

export const useDataDrawerStyle = makeStyles({
  drawer: {
    width: `250px`,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      backgroundColor: `#23262d`,
      width: `250px`,
      alignItems: `flex-end`,
      border: `1px solid #363a46`,
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
    width: `calc(100% - 20px)`,
    padding: `10px`,
    display: `flex`,
    flexDirection: `column`,
    textAlign: `left`,
    backgroundColor: `#edf1fd`,
    borderBottom: `1px solid #8e94a2`,
    '& h1': {
      borderBottom: `1px solid #8e94a2`,
      fontSize: `14px`,
      width: `100%`,
    },
    '& label': {
      fontSize: `0.8em`,
      color: `#404242`,
    },
    '& .MuiFormControlLabel-root': {
      padding: `2px 10px`,
    },
    '& .MuiCheckbox-root ': {
      padding: 0,
    },
    '& > div': {
      marginTop: `10px`,
    },
  },
  insufficientAttributeNum: {
    padding: 10,
    fontSize: 12,
    color: `#700000`,
  },
})

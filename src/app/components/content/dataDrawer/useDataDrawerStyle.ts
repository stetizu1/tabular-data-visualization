import { makeStyles } from '@mui/styles'

export const useDataDrawerStyle = makeStyles({
  drawer: {
    width: `250px`,
    flexShrink: 0,
    backgroundColor: `#2b2b2c !important`,
    '& .MuiDrawer-paper': {
      width: `250px`,
      alignItems: `flex-end`,
    },
    '& hr': {
      width: `100%`,
    },
  },
  header: {},
  menu: {
    padding: `10px`,
    width: `calc(100% - 20px)`,
    display: `flex`,
    flexDirection: `column`,
    flexGrow: 1,
    '& > div': {
      marginTop: `10px`,
    },
  },
})
